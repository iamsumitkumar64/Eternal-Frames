'use client'

import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import styles from './account.module.css';
import { useForm } from 'react-hook-form';
import { profileSchema, profileSchemaType } from '@/schemas/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { RootState } from '@/redux/store';
import { cancelCurrentSubscriptionPlan, getCurrentSubscriptionPlan } from '@/redux/feature/subscription/subscription-action';
import { updateUser } from '@/redux/feature/auth/auth-action';
import { useEffect } from 'react';
import { Feature } from '@/redux/feature/subscription/subscription-type';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { calculateSubscriptionExpiry } from '@/utils/subscription';
import { useRouter } from 'next/navigation';
import { renewCurrentSubscription } from '@/redux/feature/event/event.action';

export default function GalleryAccountPage() {
    const router = useRouter();
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    const { subscriptionUserPlan } = useAppSelector((state: RootState) => state.subscriptionReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentSubscriptionPlan()).unwrap();
    }, [])

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
            await dispatch(updateUser(data)).unwrap();
            enqueueSnackbar("Profile updated successfully", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(String(error || "Something went wrong"), { variant: "error" });
            console.log(error)
        }
    }

    const handleCancelSubscription = async () => {
        try {
            await dispatch(cancelCurrentSubscriptionPlan()).unwrap();
            enqueueSnackbar("Subscription Plan cancelled Success", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(String(error || "Something went wrong"), { variant: "error" });
            console.log(error)
        }
    }

    const handleRenewSubscription = async () => {
        try {
            await dispatch(renewCurrentSubscription()).unwrap();
            await dispatch(getCurrentSubscriptionPlan()).unwrap();
            enqueueSnackbar("Subscription Plan renwed Success", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(String(error || "Something went wrong"), { variant: "error" });
            console.log(error)
        }
    }

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
                            subscriptionUserPlan?.plan ?
                                <Box className={styles.planContainer}>
                                    <Box className={styles.planBoxSection}>
                                        <Typography className={styles.planTitle}>{subscriptionUserPlan.plan.title}</Typography>

                                        <Box className={styles.planSection}>
                                            <Box className={styles.planStatus}>
                                                <Typography className={styles.planStatusTitle}>Status</Typography>
                                                <Typography>{subscriptionStatus == 'Active' ? <FiberManualRecordIcon className={styles.activePlan} /> : <FiberManualRecordIcon className={styles.passivePlan} />} {subscriptionStatus}</Typography>
                                            </Box>
                                            <Box className={styles.planStatus}>
                                                <Typography className={styles.planStatusTitle}>Renewal</Typography>
                                                <Typography>{nextRenewal}</Typography>
                                            </Box>
                                            <Box className={styles.planStatus}>
                                                <Typography className={styles.planStatusTitle}>Time Remaining</Typography>
                                                <Typography>{timeRemaining}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box className={styles.planOptions}>
                                        <Box className={styles.planButtonSection}>
                                            <Button className={styles.renewPlanButton} onClick={async () => await handleRenewSubscription()}>
                                                Renew Now
                                            </Button>
                                            <Button className={styles.viewPlanButton} onClick={() => { router.push('/subscription/plan') }}>
                                                View Plans
                                            </Button>
                                        </Box>

                                        <Box className={styles.cancelSubscriptionBox}>
                                            <Button className={styles.cancelSubscriptionButton} onClick={async () => await handleCancelSubscription()}>Cancel Subscription</Button>
                                        </Box>
                                    </Box>

                                </Box>
                                :
                                <Box className={styles.planButtonSection}>
                                    <Typography>No Active Plan exists right now</Typography>
                                    <Button className={styles.buyPlanButton} onClick={() => { router.push('/subscription/plan') }}>
                                        Buy Subscription
                                    </Button>
                                </Box>
                        }
                    </Box>


                    <Box className={styles.rightContainer}>
                        <Typography className={styles.bottomTitles}>Plan Features</Typography>
                        <Box>
                            {subscriptionUserPlan?.plan?.features && subscriptionUserPlan.plan.features.map((feature: Feature) => {
                                return (
                                    <Box className={styles.featureBox} key={feature.uuid}>
                                        {feature.is_included ? <CheckCircleOutlinedIcon className={styles.CheckIcon} /> : <CircleOutlinedIcon className={styles.UnCheckIcon} />}
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