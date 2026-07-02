'use client'

import { Box, Button, } from '@mui/material';
import styles from './event.module.css';
import HomeHeaderComp from '@/component/common/header/header';
import { useAppSelector } from '@/redux/hooks.ts';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function HomePage() {
    const { events } = useAppSelector((state: RootState) => state.eventReducer);
    const { event_uuid } = useParams();
    const event = events.find((event) => event.uuid === event_uuid);

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
                    >
                        Upload New Image
                    </Button>
                </Box>

                <Box className={styles.eventTagBox}>
                    <Button
                        startIcon={<FileUploadOutlinedIcon />}
                    >

                    </Button>
                </Box>
            </Box>
        </Box>
    )
}