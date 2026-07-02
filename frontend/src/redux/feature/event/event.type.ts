export interface EventImage {
    uuid: string;
    event_uuid: string;
    tag_uuid: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Event {
    uuid: string;
    user_uuid: string;
    title: string;
    description: string | null;
    image_url: string | null;
    location: string | null;
    images?: EventImage[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
export interface CreateEventPayload {
    title: string;
    description?: string;
    image_url?: string;
    location?: string;
}

export interface EventState {
    events: Event[];
    eventTotalDocuments: number;
    loading: boolean;
    error: string | null;
}
