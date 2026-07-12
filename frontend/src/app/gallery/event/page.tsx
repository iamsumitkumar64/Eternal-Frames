'use client'

import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import styles from './event.module.css';
import EventFormModalComp from '@/component/event-form/event-form-comp';
import { useEffect, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { deleteEvent, getEventsByStudio } from '@/redux/feature/event/event.action';
import { RootState } from '@/redux/store';
import { enqueueSnackbar } from 'notistack';
import { Event } from '@/redux/feature/event/event.type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UserRoleEnum } from '@/redux/feature/auth/user.enum';
import LinkShareComp from '@/component/link-share-comp/link-share-comp';

export default function GalleryEventPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
    const [offset, setOffset] = useState(Number(process.env.NEXT_PUBLIC_PAGE_OFFSET) || 0);
    const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
    const { eventTotalDocuments, events } = useAppSelector((state: RootState) => state.eventReducer);
    const { user } = useAppSelector((state: RootState) => state.authReducer);

    const title = 'Checkout shared event in @event.frames';
    const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    const shareUrl = `${FRONTEND_URL}/event/${selectedEvent}`;

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

    const handleSwitchPages = (path: string) => {
        router.push(path)
    }

    const handleEventDelete = async (event_uuid: string) => {
        try {
            if (user?.role != UserRoleEnum.STUDIO) {
                enqueueSnackbar("Only Studio can delete event", { variant: "error" });
            }

            await dispatch(deleteEvent({ event_uuid })).unwrap();
        } catch (error: any) {
            enqueueSnackbar(error, { variant: "error" });
            console.log(error);
        }
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
                        {events.length ? events.map((event: Event, idx: number) => {
                            if (!event) return;

                            return (
                                <Box
                                    key={idx}
                                    className={styles.card}
                                >
                                    <Box className={styles.ImageBox}>
                                        <Image src={event?.image_url || ''} alt={event?.image_url || ''} width={100} height={100} className={styles.eventImage} />
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
                                                onClick={async () => { handleSwitchPages(`/event/${event.uuid}`) }}
                                                startIcon={<VisibilityOutlinedIcon />}
                                                className={styles.footerButton}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                startIcon={<ShareOutlinedIcon />}
                                                className={styles.footerButton}
                                                onClick={() => setSelectedEvent(event.uuid)}
                                            >
                                                Share
                                            </Button>
                                            <Button
                                                startIcon={<DeleteOutlinedIcon />}
                                                className={styles.footerButton}
                                                onClick={async () => await handleEventDelete(event.uuid)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }) : <></>}
                    </Box>
                </InfiniteScroll>
            </Box >

            <LinkShareComp open={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)} data={{ shareUrl: shareUrl, title: title }} />
            <EventFormModalComp isOpen={openCreateEventModal} onClose={handleAddEventClose} />
        </Box>
    );
}