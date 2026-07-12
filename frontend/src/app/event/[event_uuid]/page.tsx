'use client'

import { Box, Button, Typography, } from '@mui/material';
import styles from './event.module.css';
import HomeHeaderComp from '@/component/header/header';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EventImageFormModalComp from '@/component/event-image-form/event-form-image-comp';
import { EventImageTag } from '@/redux/feature/event/event.type';
import Image from 'next/image';
import { deleteEventImage, getEventByUuid } from '@/redux/feature/event/event.action';
import { UserRoleEnum } from '@/redux/feature/auth/user.enum';
import { enqueueSnackbar } from 'notistack';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { events } = useAppSelector((state: RootState) => state.eventReducer);
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    const [openCreateEventImageModal, setOpenCreateEventImageModal] = useState(false);
    const [selectedTagUuid, setSelectedTagUuid] = useState<string | null>(null);

    const { event_uuid } = useParams();
    const cleanUuid = Array.isArray(event_uuid) ? event_uuid[0] : event_uuid;

    useEffect(() => {
        dispatch(getEventByUuid({ event_uuid: cleanUuid || '' }));
    }, [dispatch]);

    const event = (events || []).find((event) => event && event.uuid === cleanUuid);
    const eventTags = event?.images
        ?.flatMap((img) => img.tag || [])
        .filter((tag) => tag !== undefined) || [];
    const uniqueTags = Array.from(
        new Map(eventTags.map((tag) => [tag.uuid, tag])).values()
    );

    const displayedImages = event?.images?.filter((image) => {
        if (!selectedTagUuid) return true;

        if (Array.isArray(image.tag)) {
            return image.tag.some((tag) => tag.uuid === selectedTagUuid);
        }
        if (image.tag && typeof image.tag === 'object') {
            return (image.tag as unknown as EventImageTag).uuid === selectedTagUuid;
        }
        return false;
    }) || [];

    const handleAddEventImageClose = () => {
        setOpenCreateEventImageModal(false);
    };

    const handleAddEventImageOpen = () => {
        setOpenCreateEventImageModal(true);
    };

    const handleTagClick = (tagUuid: string) => {
        setSelectedTagUuid((prev) => (prev === tagUuid ? null : tagUuid));
    };

    const handleDeleteImage = async (event_image_uuid: string) => {
        try {
            if (user?.role != UserRoleEnum.STUDIO) {
                enqueueSnackbar("Only Studio can delete event image", { variant: "error" });
            }

            await dispatch(deleteEventImage({ event_uuid: cleanUuid || '', event_image_uuid })).unwrap();
        } catch (error: any) {
            enqueueSnackbar(error, { variant: "error" });
            console.log(error);
        }
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.headerBox}>
                <HomeHeaderComp />
            </Box>

            <Box className={styles.eventInfoBox}>
                <Box className={styles.eventInfo}>
                    <Typography className={styles.eventTitle}>
                        {event?.title || 'N/A Title'}
                    </Typography>

                    <Typography className={styles.eventDescription}>
                        {event?.description}
                    </Typography>

                    <Button
                        startIcon={<FileUploadOutlinedIcon />}
                        className={styles.uploadImageButton}
                        onClick={handleAddEventImageOpen}
                    >
                        Upload New Image
                    </Button>
                </Box>

                <Box className={styles.eventTagBox}>
                    <Box className={styles.eventTagTopBox}></Box>

                    <Box className={styles.eventTagBottomBox}>
                        {uniqueTags.length > 0 && (
                            <Typography
                                className={`${styles.tag} ${!selectedTagUuid ? styles.activeTag : ''}`}
                                onClick={() => setSelectedTagUuid(null)}
                                style={{ cursor: 'pointer', fontWeight: !selectedTagUuid ? 'bold' : 'normal' }}
                            >
                                #All
                            </Typography>
                        )}

                        {uniqueTags && uniqueTags.map((tag: EventImageTag) => {
                            const isSelected = selectedTagUuid === tag.uuid;
                            return (
                                <Typography
                                    key={tag.uuid}
                                    className={`${styles.tag} ${isSelected ? styles.activeTag : ''}`}
                                    onClick={() => handleTagClick(tag.uuid)}
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: isSelected ? 'bold' : 'normal',
                                    }}
                                >
                                    #{tag.tag_name}
                                </Typography>
                            )
                        })}
                    </Box>
                </Box>
            </Box>

            <Box className={styles.imagesBox}>
                {displayedImages.length ? (
                    displayedImages.map((image, index) => (
                        <Box className={styles.eventImageBox} key={index}   >
                            <Image
                                src={image.image_url || ''}
                                alt={image.image_url || ''}
                                width={100}
                                height={100}
                                className={styles.eventImage}
                            />
                            {user && user.role === UserRoleEnum.STUDIO && <RemoveCircleIcon
                                onClick={() => handleDeleteImage(image.uuid)}
                                className={styles.eventImageDeleteIcon}
                            />}
                        </Box>
                    ))
                ) : (
                    <Typography>
                        {selectedTagUuid ? 'No images found for this tag' : 'Upload Images as no images found'}
                    </Typography>
                )}

            </Box>

            <EventImageFormModalComp isOpen={openCreateEventImageModal} onClose={handleAddEventImageClose} event_uuid={cleanUuid ?? ''} />
        </Box >
    )
}