"use client";

import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionPlanState, SubscriptionUserPlan } from "./subscription-type";
import { getSubscriptionPlan, getCurrentSubscriptionPlan, cancelCurrentSubscriptionPlan } from "./subscription-action";

const initialState: SubscriptionPlanState = {
    subscriptionPlans: [],
    subscriptionPlanTotalDocuments: 0,
    subscriptionUserPlan: {} as SubscriptionUserPlan,
    loading: false,
    error: null,
};

const subscriptionPlanSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        resetSubscriptionPlanError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscriptionPlan.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSubscriptionPlan.fulfilled, (state, action) => {
                const { data, totalDocuments, offset } = action.payload;
                state.loading = false;
                state.error = null;
                if (!state.subscriptionPlans || offset === 0) {
                    state.subscriptionPlans = data;
                } else {
                    state.subscriptionPlans = [...state.subscriptionPlans, ...data];
                }
                state.subscriptionPlanTotalDocuments = totalDocuments
            })
            .addCase(getSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getCurrentSubscriptionPlan.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentSubscriptionPlan.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.loading = false;
                state.error = null;
                state.subscriptionUserPlan = data;
            })
            .addCase(getCurrentSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(cancelCurrentSubscriptionPlan.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelCurrentSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.subscriptionUserPlan = null;
            })
            .addCase(cancelCurrentSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { resetSubscriptionPlanError } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;