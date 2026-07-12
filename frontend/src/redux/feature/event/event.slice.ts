"use client";

import { createSlice } from "@reduxjs/toolkit";
import { EventState } from "./event.type";
import { createEvent, createEventImage, deleteEvent, getEventsByStudio, getEventByUuid, deleteEventImage } from "./event.action";

const initialState: EventState = {
    events: [],
    eventTotalDocuments: 0,
    loading: false,
    error: null,
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        resetEventError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.events = [action.payload.event, ...state.events];
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createEventImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEventImage.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const updatedEvent = action.payload.event;
                if (updatedEvent && state.events) {
                    const index = state.events.findIndex((event) => event.uuid === updatedEvent.uuid);
                    if (index !== -1) {
                        state.events[index] = updatedEvent;
                    } else {
                        state.events = [updatedEvent, ...state.events];
                    }
                }
            })
            .addCase(createEventImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getEventsByStudio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEventsByStudio.fulfilled, (state, action) => {
                const { data, totalDocuments, offset } = action.payload;
                state.loading = false;
                state.error = null;
                state.eventTotalDocuments = totalDocuments;
                if (!state.events || offset === 0) {
                    state.events = data;
                } else {
                    state.events = [...state.events, ...data];
                }
            })
            .addCase(getEventsByStudio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                const { event_uuid, message } = action.payload;
                state.loading = false;
                state.error = null;

                const eventIndex = state.events.findIndex((event) => event.uuid === event_uuid);
                if (eventIndex !== -1) {
                    state.eventTotalDocuments = state.eventTotalDocuments - 1;
                    state.events = state.events.filter((event) => event.uuid !== event_uuid);
                }

            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getEventByUuid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEventByUuid.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.loading = false;
                state.error = null;
                const eventUuid = data.uuid;
                if (eventUuid && state.events) {
                    const index = state.events.findIndex((event) => event.uuid === eventUuid);
                    if (index !== -1) {
                        state.events[index] = data;
                        state.eventTotalDocuments = state.eventTotalDocuments + 1;
                    } else {
                        state.events = [data, ...state.events];
                    }
                }
            })
            .addCase(getEventByUuid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteEventImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEventImage.fulfilled, (state, action) => {
                const { event_image_uuid, event_uuid, message } = action.payload;
                state.loading = false;
                state.error = null;

                const eventIndex = state.events.findIndex((event) => event.uuid === event_uuid);
                if (state.events[eventIndex]?.images && eventIndex !== -1) {
                    state.events[eventIndex].images = state.events[eventIndex]?.images.filter((image) => image.uuid !== event_image_uuid);
                }
            })
            .addCase(deleteEventImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetEventError } = eventSlice.actions;
export default eventSlice.reducer;
