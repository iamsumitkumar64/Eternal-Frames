export interface Feature {
    uuid: string;
    feature_name: string;
    is_included: boolean;
    plan_uuid: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface SubscriptionPlan {
    uuid: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    is_active: boolean;
    premium_level: number;
    features: Feature[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface SubscriptionUserPlan {
    uuid: string;
    plan_uuid: string;
    user_uuid: string;
    plan: SubscriptionPlan,
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface ApiResponse<T> {
    data: T;
    limit: number;
    offset: number;
    totalDocuments: number;
    message: string;
}

export type SubscriptionPlanResponse = ApiResponse<SubscriptionPlan[]>;

export interface SubscriptionPlanState {
    subscriptionPlans: SubscriptionPlan[];
    subscriptionPlanTotalDocuments: number;
    subscriptionUserPlan: SubscriptionUserPlan;
    loading: boolean;
    error: string | null;
}