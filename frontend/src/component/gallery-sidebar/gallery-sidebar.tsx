'use client'

import { Box, Button, Typography } from '@mui/material';
import styles from './gallery-sidebar.module.css';
import EventIcon from '@mui/icons-material/Event';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useAppDispatch } from '@/redux/hooks.ts';
import { logoutUser } from '@/redux/feature/auth/auth-action';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';

export default function GallerySideBarComp() {
    const router = useRouter()
    const dispatch = useAppDispatch();

    const handleLogOut = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            localStorage.clear()
            router.replace("/")
        } catch (err: any) {
            enqueueSnackbar(err, { variant: "error" })
        }
    }

    const handleSwitchPages = async (path: string) => {
        router.push(path)
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <Typography className={styles.title} onClick={async () => { await handleSwitchPages('/') }}>
                    Eternal Frames
                </Typography>

                <Typography className={styles.description}>
                    Studio Dashboard
                </Typography>
            </Box>

            <Box className={styles.tabBox}>
                <Button
                    className={styles.button}
                    onClick={async () => { await handleSwitchPages('/gallery/event') }}
                >
                    <EventIcon />Events
                </Button>

                <Button
                    className={styles.button}
                    onClick={async () => { await handleSwitchPages('/gallery/account') }}
                >
                    <AccountBoxOutlinedIcon />Account
                </Button>
            </Box>

            <Box className={styles.footer}>
                <Button
                    className={styles.logoutbtn}
                    onClick={async () => { await handleLogOut() }}
                >
                    <LogoutIcon className={styles.iconButton} />
                    Log Out
                </Button>
            </Box>
        </Box>
    );
}