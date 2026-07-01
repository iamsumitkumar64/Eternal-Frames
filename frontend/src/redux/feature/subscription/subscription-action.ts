"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8090";
const LIMIT = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
const OFFSET = Number(process.env.NEXT_PUBLIC_PAGE_OFFSET) || 0;


export const getSubscriptionPlan = createAsyncThunk<
    { data: any, totalDocuments: number, message: string, limit: number, offset: number },
    { limit?: number; offset?: number },
    { state: RootState }
>(
    "subscription/plans/get",
    async (
        {
            limit = LIMIT,
            offset = OFFSET,
        },
        { getState, rejectWithValue }
    ) => {
        try {
            const token = getState().authReducer.token || "";
            const res = await fetch(
                `${BACKEND_URL}/api/v1/subscription/plan/?limit=${limit}&offset=${offset}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            return result;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getRazorPayLinkForSubscription = createAsyncThunk<
    any,
    { total_price: number, plan_uuid: string },
    { state: RootState }
>(
    "razor/pay/link",
    async (payload, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || "";

            const res = await fetch(`${BACKEND_URL}/api/v1/razor/pay/link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            return result;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);