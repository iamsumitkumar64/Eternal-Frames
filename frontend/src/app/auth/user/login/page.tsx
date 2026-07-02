"use client"

import styles from "./login.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "@/redux/feature/auth/auth-action"
import { useRouter } from "next/navigation"
import { Box, Button, Card, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useAppDispatch } from "@/redux/hooks.ts"
import { useState } from "react"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginSchema, LoginSchemaType } from "@/schemas/login"

export default function UserLoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (data: LoginSchemaType) => {
        try {
            await dispatch(loginUser(data)).unwrap()
            enqueueSnackbar("User Logged In Success", { variant: "success" });
            router.replace("/gallery/event")
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" });
            console.log(error)
        }
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.header}>
                <Typography className={styles.title}>
                    Welcome Back
                </Typography>

                <Typography className={styles.description}>
                    Sign in to manage your milestone memories.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Box className={styles.field}>
                    <InputLabel htmlFor={`${2}-input`} className={styles.label}>Email Address</InputLabel>

                    <TextField
                        id={`${2}-input`}
                        type="email"
                        placeholder="juilanne@example.com"
                        fullWidth
                        {...register("email")}
                        variant="standard"
                    />
                    {errors.email && (
                        <span className={styles.error}>
                            {errors.email.message}
                        </span>
                    )}
                </Box>

                <Box className={styles.field}>
                    <InputLabel htmlFor={`${3}-input`} className={styles.label}>Password</InputLabel>

                    <TextField
                        id={`${3}-input`}
                        placeholder="XXX-XXX-XXX"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        {...register("password")}
                        variant="standard"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showPassword ? <LockOutlinedIcon /> : <LockOpenIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {errors.password && (
                        <span className={styles.error}>
                            {errors.password.message}
                        </span>
                    )}
                </Box>

                <Box className={styles.buttonTopBox}>
                    <Button
                        type="submit"
                        className={styles.button}
                    >
                        Sign In
                    </Button>
                </Box>

                <Box className={styles.buttonBottomBox}>
                    <Typography className={styles.alreadyAccountTitle}>Choose Experience?</Typography>

                    <Button
                        className={styles.loginBtn}
                        onClick={() => router.push("/")}
                    >
                        Join Us
                    </Button>
                </Box>
            </form>
        </Box >
    )
}