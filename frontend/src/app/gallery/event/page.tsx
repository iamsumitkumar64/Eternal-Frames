'use client'

import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import styles from './event.module.css';
import EventFormModalComp from '@/component/event-form/event-form-comp';
import { useEffect, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { getEventsByStudio } from '@/redux/feature/event/event.action';
import { RootState } from '@/redux/store';
import { enqueueSnackbar } from 'notistack';
import { Event } from '@/redux/feature/event/event.type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function GalleryEventPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
    const [offset, setOffset] = useState(Number(process.env.NEXT_PUBLIC_PAGE_OFFSET) || 0);
    const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
    const { eventTotalDocuments, events } = useAppSelector((state: RootState) => state.eventReducer);

    useEffect(() => {
        dispatch(getEventsByStudio({ limit, offset: 0, })).unwrap();
    }, []);

    const fetchSubscriptionPlan = async () => {
        try {
            if (events.length >= eventTotalDocuments) return;

            const newOffset = offset + limit;
            setOffset(newOffset);
            await dispatch(getEventsByStudio({ limit, offset: newOffset })).unwrap();
        } catch (error: any) {
            enqueueSnackbar(error, { variant: "error" });
            console.log(error);
        }
    };

    const handleAddEventClose = () => {
        setOpenCreateEventModal(false);
    };

    const handleAddEventOpen = () => {
        setOpenCreateEventModal(true);
    };

    const handleSwitchPages = async (path: string) => {
        router.push(path)
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <Typography className={styles.title}>
                    My Events
                </Typography>
                <Box className={styles.headerButtonBox}>
                    <Button className={styles.headerButton} startIcon={<AddOutlinedIcon />} onClick={handleAddEventOpen}>Create New Event</Button>
                </Box>
            </Box>

            <Box id="scrollableDiv" className={styles.scrollWrapper}>
                <InfiniteScroll
                    dataLength={events?.length || 0}
                    next={fetchSubscriptionPlan}
                    hasMore={events?.length < eventTotalDocuments}
                    loader={<Box className={styles.loader}><CircularProgress size={30} /></Box>}
                    // endMessage={<Typography className={styles.endMessage}>Yay! You have seen it all</Typography>}
                    scrollableTarget="scrollableDiv"
                >
                    <Box className={styles.eventWrapper}>
                        {events.length && events.map((event: Event, idx: number) => {
                            return (
                                <Box
                                    key={idx}
                                    className={styles.card}
                                >
                                    <Box className={styles.ImageBox}>
                                        <Image src={event.image_url || ''} alt='rightBusinessInfo.jpg' width={100} height={100} className={styles.eventImage} />
                                    </Box>

                                    <Box className={styles.eventInfoBox}>
                                        <Box className={styles.eventInfoHeader}>
                                            <Box className={styles.eventInfo}>
                                                <Typography className={styles.eventTitle}>{event.title}</Typography>
                                                <Typography className={styles.eventLocation}>{event.location}</Typography>
                                            </Box>
                                            <Typography className={styles.eventTotalImages}>{event.images?.length || 'N/A'} Photos</Typography>
                                        </Box>

                                        <Typography className={styles.description}>{event.description}</Typography>

                                        <Box className={styles.eventFooter}>
                                            <Button
                                                onClick={async () => { await handleSwitchPages(`/gallery/event/${event.uuid}`) }}
                                                startIcon={<VisibilityOutlinedIcon />}
                                                className={styles.footerButton}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                startIcon={<ShareOutlinedIcon />}
                                                className={styles.footerButton}
                                            >
                                                Share
                                            </Button>
                                            <Button
                                                startIcon={<DeleteOutlinedIcon />}
                                                className={styles.footerButton}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </InfiniteScroll>
            </Box >
            <EventFormModalComp isOpen={openCreateEventModal} onClose={handleAddEventClose} />
        </Box>
    );
}