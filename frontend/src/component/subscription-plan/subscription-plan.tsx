'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { RootState } from "@/redux/store";
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import styles from './subscription-plan.module.css';
import { useEffect, useState } from "react";
import { getSubscriptionPlan } from "@/redux/feature/subscription/subscription-action";
import { enqueueSnackbar } from "notistack";
import InfiniteScroll from "react-infinite-scroll-component";
import { Feature, SubscriptionPlan } from "@/redux/feature/subscription/subscription-type";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export default function SubscriptionPlanComp() {
    const dispatch = useAppDispatch();
    const [offset, setOffset] = useState(Number(process.env.NEXT_PUBLIC_PAGE_OFFSET) || 0);
    const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
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

                                    <Box className={styles.pricing}>
                                        <Typography className={styles.currency}>
                                            {plan.currency}
                                        </Typography>

                                        <Typography className={styles.price}>
                                            {plan.price}
                                        </Typography>

                                        <Typography className={styles.duration}>
                                            /month
                                        </Typography>
                                    </Box>

                                    {plan.features.length && plan.features.map((feature: Feature, idx: number) => (
                                        <Box className={styles.featureBox} key={idx}>
                                            {feature.is_included ? <CheckCircleIcon /> : <CheckCircleOutlinedIcon />}
                                            <Typography className={styles.currency}>
                                                {feature.feature_name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Card>
                            )
                        })}
                    </Box>
                </InfiniteScroll>
            </Box >
        </Box >
    );
}