'use client'

import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import styles from './account.module.css';
import { useForm } from 'react-hook-form';
import { profileSchema, profileSchemaType } from '@/schemas/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { RootState } from '@/redux/store';
import { getCurrentSubscriptionPlan } from '@/redux/feature/subscription/subscription-action';
import { updateUser } from '@/redux/feature/auth/auth-action';
import { useEffect } from 'react';
import { Feature } from '@/redux/feature/subscription/subscription-type';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { calculateSubscriptionExpiry } from '@/utils/subscription';

export default function GalleryAccountPage() {
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    const { subscriptionUserPlan } = useAppSelector((state: RootState) => state.subscriptionReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentSubscriptionPlan()).unwrap();
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<profileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: user?.email ?? "",
            name: user?.name ?? "",
        }
    })

    useEffect(() => {
        if (user) {
            reset({
                email: user.email ?? "",
                name: user.name ?? "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: profileSchemaType) => {
        try {
            await dispatch(updateUser(data)).unwrap();
            enqueueSnackbar("Profile updated successfully", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(String(error || "Something went wrong"), { variant: "error" });
            console.log(error)
        }
    }

    // Dynamic calculations for subscription plan expiry (Task 2) using utils
    const { subscriptionStatus, nextRenewal, timeRemaining } = calculateSubscriptionExpiry(
        subscriptionUserPlan?.created_at
    );

    return (
        <Box className={styles.container}>
            <Box className={styles.topContainer}>
                <Box className={styles.header}>
                    <Typography className={styles.title}>Profile Management</Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor="studio-name-input" className={styles.label}>Studio Name</InputLabel>

                        <TextField
                            id="studio-name-input"
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
                        <InputLabel htmlFor="email-input" className={styles.label}>Email Address</InputLabel>

                        <TextField
                            id="email-input"
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

                <Box className={styles.subscriptionBody}>
                    <Box className={styles.leftContainer}>
                        <Typography className={styles.bottomTitles}>Current Plan</Typography>
                        {
                            subscriptionUserPlan ?
                                <Box className={styles.planContainer}>
                                    <Box>
                                        <Typography>{subscriptionUserPlan.plan.title}</Typography>

                                        <Box>
                                            <Box>
                                                <Typography>Status</Typography>
                                                <Typography>{subscriptionStatus}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>Renewal</Typography>
                                                <Typography>{nextRenewal}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>Time Remaining</Typography>
                                                <Typography>{timeRemaining}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Button>
                                            Renew Now
                                        </Button>
                                    </Box>
                                </Box>
                                :
                                <>No Active Plan exists right now</>
                        }
                    </Box>
                    <Box className={styles.rightContainer}>
                        <Typography className={styles.bottomTitles}>Plan Features</Typography>
                        <Box>
                            {subscriptionUserPlan && subscriptionUserPlan.plan.features.map((feature: Feature) => {
                                return (
                                    <Box className={styles.featureBox} key={feature.uuid}>
                                        {feature.is_included ? <CheckCircleIcon className={styles.CheckIcon} /> : <CancelOutlinedIcon className={styles.UnCheckIcon} />}
                                        <Typography className={styles.featureName}>
                                            {feature.feature_name}
                                        </Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}