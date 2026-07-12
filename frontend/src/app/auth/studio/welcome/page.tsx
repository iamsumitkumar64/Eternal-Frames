import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from './welcome.module.css';
import NavButton from '@/component/nav-button/nav-button';
import Link from 'next/link';

export const metadata = {
    title: 'Elevate Your Artistry | Celebration Studio',
    description: 'Elevating your professional artistry through seamless digital preservation and immersive gallery experiences.',
};

export default function WelcomePage() {
    return (
        <Box component="main" className={styles.container}>
            <Box component="header" className={styles.header}>
                <Link className={styles.logo} href={'/'}>
                    Eternal Frames
                </Link>
            </Box>

            <Box className={styles.mainContent}>
                <Typography variant="h2" className={styles.tagline}>
                    Elevating your professional artistry through seamless digital preservation.
                </Typography>

                <Typography variant="body1" className={styles.subText}>
                    Transform your celebration event creations into immersive gallery experiences and let your work speak for itself.
                </Typography>

                <Box className={styles.buttonGroup}>
                    <NavButton
                        title="Create Studio Account"
                        redirectTo="/auth/studio/register"
                        sx={{
                            width: '100%',
                            borderRadius: '50px',
                            padding: '12px 32px',
                            color: ' #ffffff',
                            backgroundColor: '#b47b00',
                            transition: "transform 0.2s ease",
                            '&:hover': {
                                backgroundColor: '#ff5e78',
                                transform: "scale(1.05)"
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
