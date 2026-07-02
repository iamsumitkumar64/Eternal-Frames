"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { CreateEventPayload, Event } from "./event.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8090";
const LIMIT = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
const OFFSET = Number(process.env.NEXT_PUBLIC_PAGE_OFFSET) || 0;

export const createEvent = createAsyncThunk<
    { message: string, event: Event },
    CreateEventPayload,
    { state: RootState }
>(
    "event/create",
    async (payload, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || "";
            const res = await fetch(`${BACKEND_URL}/api/v1/event`, {
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

export const getEventsByStudio = createAsyncThunk<
    { message: string, data: Event[], limit: number, offset: number, totalDocuments: number },
    { limit?: number; offset?: number },
    { state: RootState }
>(
    "event/listing/get",
    async (
        {
            limit = LIMIT,
            offset = OFFSET,
        },
        { getState, rejectWithValue }
    ) => {
        try {
            const token = getState().authReducer.token || "";
            const res = await fetch(`${BACKEND_URL}/api/v1/event/?limit=${limit}&offset=${offset}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
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

export const uploadEventImage = createAsyncThunk<
    any,
    any,
    { state: RootState }
>(
    "post/uploadImages",
    async (files: File[], { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || "";

            const formData = new FormData();

            files.forEach((file) => {
                formData.append("imageUrl", file);
            });

            const res = await fetch(`${BACKEND_URL}/api/v1/upload/images`, {
                method: "POST",
                headers: {
                    Authorization: token,
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
