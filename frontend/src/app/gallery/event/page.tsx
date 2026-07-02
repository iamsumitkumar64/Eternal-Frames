'use client'

import { Box, Button, Typography } from '@mui/material';
import styles from './event.module.css';
import EventFormModalComp from '@/component/event-form/event-form-comp';
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function GalleryEventPage() {
    const [openCreateEventModal, setOpenCreateEventModal] = useState(false);

    const handleAddEventClose = () => {
        setOpenCreateEventModal(false);
    };

    const handleAddEventOpen = () => {
        setOpenCreateEventModal(true);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <Typography className={styles.title}>
                    My Events
                </Typography>
                <Box className={styles.buttonBox}>
                    <Button className={styles.button} startIcon={<AddOutlinedIcon />} onClick={handleAddEventOpen}>Create New Event</Button>
                </Box>
            </Box>

            <EventFormModalComp isOpen={openCreateEventModal} onClose={handleAddEventClose} />
        </Box>
    );
}