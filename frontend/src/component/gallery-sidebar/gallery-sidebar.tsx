import { Box, Typography } from '@mui/material';
import styles from './gallery-sidebar.module.css';
import EventIcon from '@mui/icons-material/Event';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Link from 'next/link';

export default function GallerySideBarComp() {
    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <Typography className={styles.title}>
                    Eternal Frames
                </Typography>

                <Typography className={styles.description}>
                    Studio Dashboard
                </Typography>
            </Box>

            <Box className={styles.tabBox}>
                <Link href={'/gallery/event'}>
                    <EventIcon />     Events
                </Link>

                <Link href={'/gallery/account'}>
                    <AccountBoxOutlinedIcon />   Account
                </Link>
            </Box>
        </Box>
    );
}