'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { RootState } from "@/redux/store";
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import styles from './subscription-plan.module.css';
import { useEffect, useState } from "react";
import { getRazorPlanLinkForSubscription, getSubscriptionPlan, studioBuySubscriptionWebhook } from "@/redux/feature/subscription/subscription-action";
import { enqueueSnackbar } from "notistack";
import InfiniteScroll from "react-infinite-scroll-component";
import { Feature, SubscriptionPlan } from "@/redux/feature/subscription/subscription-type";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useRouter } from "next/navigation";

export default function SubscriptionPlanComp() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [offset, setOffset] = useState(Number(process.env.NEXT_PUBLIC_PAGE_OFFSET) || 0);
    const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    const { subscriptionPlanTotalDocuments, subscriptionPlans } = useAppSelector((state: RootState) => state.subscriptionReducer);

    useEffect(() => {
        dispatch(getSubscriptionPlan({ limit, offset: 0, })).unwrap();
    }, []);

    const fetchSubscriptionPlan = async () => {
        try {
            if (subscriptionPlans.length >= subscriptionPlanTotalDocuments) return;

            const newOffset = offset + limit;
            setOffset(newOffset);
            await dispatch(getSubscriptionPlan({ limit, offset: newOffset })).unwrap();
        } catch (error: any) {
            enqueueSnackbar(error, { variant: "error" });
            console.log(error);
        }
    };

    const handlePay = async (plan: SubscriptionPlan) => {
        try {
            if (!user) {
                enqueueSnackbar("Join Us First or Login Account");
                return;
            }
            const razorOrder = await dispatch(getRazorPlanLinkForSubscription({ total_price: Number(plan.price), plan_uuid: plan.uuid })).unwrap();
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: razorOrder.data.amount,
                currency: razorOrder.data.currency,
                order_id: razorOrder.data.id, // Order ID from backend
                handler: async (response: any) => {
                    // Send payment details to backend for verification
                    await verifyPayment(plan.uuid);
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err: any) {
            enqueueSnackbar(err, { variant: "warning" });
        }
    };

    // local webhook triggered
    const verifyPayment = async (plan_uuid: string) => {
        try {
            await dispatch(studioBuySubscriptionWebhook({ plan_uuid })).unwrap();
            router.replace('/gallery');
        } catch (err: any) {
            enqueueSnackbar(err, { variant: "warning" });
        }
    };

    return (
        <Box className={styles.container}>
            <Box id="scrollableDiv" className={styles.scrollWrapper}>
                <InfiniteScroll
                    dataLength={subscriptionPlans?.length || 0}
                    next={fetchSubscriptionPlan}
                    hasMore={subscriptionPlans?.length < subscriptionPlanTotalDocuments}
                    loader={<Box className={styles.loader}><CircularProgress size={30} /></Box>}
                    // endMessage={<Typography className={styles.endMessage}>Yay! You have seen it all</Typography>}
                    scrollableTarget="scrollableDiv"
                >
                    <Box className={styles.planWrapper}>
                        {subscriptionPlans.length && subscriptionPlans.map((plan: SubscriptionPlan, idx: number) => {
                            return (
                                <Card
                                    key={idx}
                                    className={styles.card}
                                    elevation={2}
                                >
                                    <Box className={styles.header}>
                                        <Typography className={styles.title}>
                                            {plan.title}
                                        </Typography>

                                        <Typography className={styles.description}>
                                            {plan.description}
                                        </Typography>
                                    </Box>

                                    {
                                        plan.premium_level == 5
                                        &&
                                        <Typography className={styles.premium_tag}>Most Preferred One</Typography>
                                    }

                                    <Box className={styles.pricing}>
                                        <Typography className={styles.currency}>
                                            {plan.currency}
                                        </Typography>

                                        <Typography className={styles.price} component="p">
                                            {plan.price}
                                            <Typography className={styles.duration} component="span">
                                                /month
                                            </Typography>
                                        </Typography>

                                    </Box>

                                    <Box className={styles.features}>
                                        {plan.features.length && plan.features.map((feature: Feature, idx: number) => (
                                            <Box className={styles.featureBox} key={idx}>
                                                {feature.is_included ? <CheckCircleIcon className={styles.CheckIcon} /> : <CancelOutlinedIcon className={styles.UnCheckIcon} />}
                                                <Typography className={styles.featureName}>
                                                    {feature.feature_name}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Button className={styles.selectPlan} onClick={() => { handlePay(plan) }}>
                                        Select Plan
                                    </Button>
                                </Card>
                            )
                        })}
                    </Box>
                </InfiniteScroll>
            </Box >
        </Box >
    );
}