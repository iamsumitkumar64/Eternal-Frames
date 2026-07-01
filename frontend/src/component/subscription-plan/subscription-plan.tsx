'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { RootState } from "@/redux/store";
import { Box, CircularProgress, Typography } from '@mui/material';
import styles from './subscription-plan.module.css';
import { useEffect, useState } from "react";
import { getSubscriptionPlan } from "@/redux/feature/subscription/subscription-action";
import { enqueueSnackbar } from "notistack";
import InfiniteScroll from "react-infinite-scroll-component";
import { SubscriptionPlan } from "@/redux/feature/subscription/subscription-type";

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
                        {subscriptionPlans.length && subscriptionPlans.map((plan: SubscriptionPlan) => {
                            return (
                                <Box key={plan.uuid}>
                                    {plan.title}
                                </Box>
                            )
                        })}
                    </Box>
                </InfiniteScroll>
            </Box>
        </Box>
    );
}