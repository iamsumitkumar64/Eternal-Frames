'use client'

import { Box, Button, Typography, } from '@mui/material';
import styles from './event.module.css';
import HomeHeaderComp from '@/component/common/header/header';
import { useAppSelector } from '@/redux/hooks.ts';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EventImageFormModalComp from '@/component/event-image-form/event-form-image-comp';
import { EventImageTag } from '@/redux/feature/event/event.type';
import Image from 'next/image';

export default function HomePage() {
    const { events } = useAppSelector((state: RootState) => state.eventReducer);
    const [openCreateEventImageModal, setOpenCreateEventImageModal] = useState(false);
    const { event_uuid } = useParams();
    const cleanUuid = Array.isArray(event_uuid) ? event_uuid[0] : event_uuid;

    const event = events.find((event) => event.uuid === cleanUuid);
    const eventTags = event?.images
        ?.flatMap((img) => img.tag || [])
        .filter((tag) => tag !== undefined) || [];
    const uniqueTags = Array.from(
        new Map(eventTags.map((tag) => [tag.uuid, tag])).values()
    );

    const handleAddEventImageClose = () => {
        setOpenCreateEventImageModal(false);
    };

    const handleAddEventImageOpen = () => {
        setOpenCreateEventImageModal(true);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.headerBox}>
                <HomeHeaderComp />
            </Box>

            <Box className={styles.eventInfoBox}>
                <Box className={styles.eventInfo}>
                    <Box className={styles.eventTitle}>
                        {event?.title || 'N/A Title'}
                    </Box>
                    <Box className={styles.eventDescription}>
                        {event?.description}
                    </Box>
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
                        {uniqueTags && uniqueTags.map((tag: EventImageTag) => {
                            return (
                                <Typography
                                    className={styles.tagImage}
                                >
                                    #{tag.tag_name}
                                </Typography>
                            )
                        })}
                    </Box>
                </Box>
            </Box>

            <Box className={styles.imagesBox}>
                {event?.images?.length ? (
                    event.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image.image_url || ''}
                            alt='rightBusinessInfo.jpg'
                            width={100}
                            height={100}
                            className={styles.eventImage}
                        />
                    ))
                ) : (
                    <Typography>Upload Images as no images found</Typography>
                )}

            </Box>

            <EventImageFormModalComp isOpen={openCreateEventImageModal} onClose={handleAddEventImageClose} event_uuid={cleanUuid ?? ''} />
        </Box >
    )
}