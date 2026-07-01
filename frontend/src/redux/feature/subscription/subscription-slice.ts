"use client";

import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionPlanChatState } from "./subscription-type";
import { getSubscriptionPlan } from "./subscription-action";

const initialState: SubscriptionPlanChatState = {
    subscriptionPlans: [],
    subscriptionPlanTotalDocuments: 0,
    loading: false,
    error: null,
};

const subscriptionPlanSlice = createSlice({
    name: "chat",
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
            })
            .addCase(getSubscriptionPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { resetSubscriptionPlanError } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;