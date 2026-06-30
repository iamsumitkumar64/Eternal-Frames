"use client"

import { usePathname, useRouter } from "next/navigation"
import { Box, Button, IconButton, Typography } from "@mui/material"
import { RootState } from "@/redux/store"
import styles from "./header.module.css"
import { logoutUser } from "@/redux/feature/auth/auth-action"
import { enqueueSnackbar } from "notistack"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function HomeHeaderComp() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: RootState) => state.authReducer);

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
            <Box className={styles.leftContainer}>
                <Typography onClick={() => { router.push("/") }} className={styles.title}>Eternal Frames</Typography>
            </Box>

            <Box className={styles.rightContainer}>
                {user ? (
                    <Box className={styles.rightBox}>
                        <Button
                            className={styles.logoutbtn}
                            onClick={async () => { await handleSwitchPages('/gallery') }}
                        >
                            Gallery
                        </Button>

                        <Button
                            className={styles.logoutbtn}
                            onClick={async () => { await handleLogOut() }}
                        >
                            <LogoutIcon className={styles.iconButton} />
                            Log Out
                        </Button>
                    </Box>
                ) : (
                    <Box className={styles.rightBox}>
                        <Button
                            className={styles.loginButton}
                            onClick={() => {
                                router.push("/login")
                            }}
                        >
                            <LoginIcon className={styles.iconButton} />
                            Sign In
                        </Button>
                    </Box>
                )}
            </Box>
        </Box >
    )
}