// Payload Types for Event Module
export interface UserRegisteredMQEventPayload {
    uuid: string;
    email: string;
    name?: string;
    profile_image?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface SubscriptionUserCreatedMQEventPayload {
    uuid: string;
    user_uuid: string;
    plan_uuid: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface UserUpdatedMQEventPayload {
    uuid: string;
    email: string;
    name?: string;
    profile_image?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export type EventEventPayloadMap = {
    'user.registered': UserRegisteredMQEventPayload,
    'user.updated': UserUpdatedMQEventPayload,
    'subscription_user.created': SubscriptionUserCreatedMQEventPayload,
};

// Generic union type
export type EventEventPayload = EventEventPayloadMap[keyof EventEventPayloadMap];

// 1. Define the Handler Function Type
export type EventHandlerFunction<K extends keyof EventEventPayloadMap> =
    (payload: EventEventPayloadMap[K], outbox_uuid: string, event_name: string) => Promise<void>;

// 2. Map of exact handler signatures
export type EventEventHandlerMap = {
    [K in keyof EventEventPayloadMap]?: EventHandlerFunction<K>[];
};