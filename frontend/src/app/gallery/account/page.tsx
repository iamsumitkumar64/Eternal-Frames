'use client'

import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import styles from './account.module.css';
import { useForm } from 'react-hook-form';
import { profileSchema, profileSchemaType } from '@/schemas/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '@/redux/hooks.ts';
import { RootState } from '@/redux/store';

export default function GalleryAccountPage() {
    const { user } = useAppSelector((state: RootState) => state.authReducer);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<profileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: user?.email ?? "",
            name: user?.name ?? "",
        }
    })

    const onSubmit = async (data: profileSchemaType) => {
        try {
            enqueueSnackbar("User Logged In Success", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" });
            console.log(error)
        }
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.topContainer}>
                <Box className={styles.header}>
                    <Typography className={styles.title}>Profile Management</Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor={`${2}-input`} className={styles.label}>Studio Name</InputLabel>

                        <TextField
                            id={`${2}-input`}
                            type="text"
                            placeholder="Eternal Frames Photography"
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
                        <InputLabel htmlFor={`${2}-input`} className={styles.label}>Email Address</InputLabel>

                        <TextField
                            id={`${2}-input`}
                            type="email"
                            placeholder="julian@eternalframes.studio"
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

                    <Button
                        type="submit"
                        className={styles.button}
                    >
                        Save Changes
                    </Button>
                </form>
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