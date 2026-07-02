'use client'

import { Box, Typography } from '@mui/material';
import styles from './account.module.css';

export default function GalleryAccountPage() {
    return (
        <Box className={styles.container}>
            <Box className={styles.topContainer}>
                <Box className={styles.header}>
                    <Typography className={styles.title}>Profile Management</Typography>
                </Box>

                <Box>

                </Box>
            </Box>

            <Box className={styles.bottomContainer}>
                <Box className={styles.header}>
                    <Typography className={styles.title}>Subscription Management</Typography>
                </Box>

                <Box>

                </Box>
            </Box>
        </Box>
    );
}