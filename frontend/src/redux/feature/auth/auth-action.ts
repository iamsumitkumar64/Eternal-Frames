"use client"

import { createAsyncThunk } from "@reduxjs/toolkit"
import { RegisterSchemaType } from "@/schemas/register"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8090";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: RegisterSchemaType, { rejectWithValue }) => {
        try {
            const { ...payload } = data

            const res = await fetch(`${BACKEND_URL}/api/v1/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })

            const result = await res.json()

            if (!res.ok) throw new Error(result.message)

            return result;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/v1/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const result = await res.json()

            if (!res.ok) throw new Error(result.message)

            return result
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const { persistor } = await import("@/redux/store");
            await persistor.purge();
            return null
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)