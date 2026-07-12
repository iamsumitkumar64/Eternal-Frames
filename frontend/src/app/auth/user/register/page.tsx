"use client"

import styles from "./register.module.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterSchemaType } from "@/schemas/register"
import { registerUser } from "@/redux/feature/auth/auth-action"
import { useRouter } from "next/navigation"
import { Box, Button, Card, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { useAppDispatch } from "@/redux/hooks.ts"
import { UserRoleEnum } from "@/redux/feature/auth/user.enum"
import { useState } from "react"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function UserRegisterPage() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: { role: UserRoleEnum.USER }
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (data: RegisterSchemaType) => {
        try {
            await dispatch(registerUser(data)).unwrap()
            enqueueSnackbar("User Registered Success", { variant: "success" });
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
                    Create User Account
                </Typography>

                <Typography className={styles.description}>
                    Enter your details to join the celebration.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Box className={styles.field}>
                    <InputLabel htmlFor={`full-name-input`} className={styles.label}>Full Name</InputLabel>

                    <TextField
                        id={`full-name-input`}
                        placeholder="E.g., Juilanne Vought"
                        type="text"
                        fullWidth
                        {...register("name")}
                        variant="standard"
                    />
                    {errors.name && (
                        <span className={styles.error}>
                            {errors.name.message}
                        </span>
                    )}
                </Box>

                <Box className={styles.field}>
                    <InputLabel htmlFor={`email-input`} className={styles.label}>Email Address</InputLabel>

                    <TextField
                        id={`email-input`}
                        placeholder="juilanne@example.com"
                        type="email"
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
                    <InputLabel htmlFor={`password-input`} className={styles.label}>Password</InputLabel>

                    <TextField
                        id={`password-input`}
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
                        Create User Account
                    </Button>
                </Box>

                <Box className={styles.buttonBottomBox}>
                    <Typography className={styles.alreadyAccountTitle}>Already have an Account?</Typography>

                    <Button
                        className={styles.loginBtn}
                        onClick={() => router.push("/auth/user/login")}
                    >
                        Sign In
                    </Button>
                </Box>
            </form>
        </Box >
    )
}