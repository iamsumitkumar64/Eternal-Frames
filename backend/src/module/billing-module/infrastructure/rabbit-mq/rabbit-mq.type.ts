// Payload Types for Billing Module
export interface UserRegisteredMQEventPayload {
    uuid: string;
    email: string;
    name?: string;
    profile_image?: string;
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

export type BillingEventPayloadMap = {
    'user.registered': UserRegisteredMQEventPayload,
    'user.updated': UserUpdatedMQEventPayload,
};

// Generic union type
export type BillingEventPayload = BillingEventPayloadMap[keyof BillingEventPayloadMap];

// 1. Define the Handler Function Type
export type EventHandlerFunction<K extends keyof BillingEventPayloadMap> =
    (payload: BillingEventPayloadMap[K], outbox_uuid: string, event_name: string) => Promise<void>;

// 2. Map of exact handler signatures
export type BillingEventHandlerMap = {
    [K in keyof BillingEventPayloadMap]?: EventHandlerFunction<K>[];
};