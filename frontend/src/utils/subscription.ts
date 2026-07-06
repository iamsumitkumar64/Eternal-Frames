export interface SubscriptionExpiryInfo {
    subscriptionStatus: string;
    nextRenewal: string;
    timeRemaining: string;
}

export function calculateSubscriptionExpiry(createdAt: string | Date | undefined): SubscriptionExpiryInfo {
    const expiryMonths = Number(process.env.NEXT_PUBLIC_SUBSCRIPTION_PLAN_EXPIRY_MONTHS) || 2;
    let subscriptionStatus = "Inactive";
    let nextRenewal = "N/A";
    let timeRemaining = "N/A";

    if (createdAt) {
        const startDate = new Date(createdAt);
        const renewalDate = new Date(startDate);
        renewalDate.setMonth(startDate.getMonth() + expiryMonths);

        const currentDate = new Date();
        const diffMs = renewalDate.getTime() - currentDate.getTime();
        const isActive = diffMs > 0;
        subscriptionStatus = isActive ? "Active" : "Expired";

        if (!isActive) {
            timeRemaining = "0 Days";
        } else {
            const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            if (totalDays >= 30) {
                const months = Math.floor(totalDays / 30);
                const days = totalDays % 30;
                timeRemaining = `${months} Month${months > 1 ? 's' : ''} ${days > 0 ? `${days} Day${days > 1 ? 's' : ''}` : ''}`.trim();
            } else {
                timeRemaining = `${totalDays} Day${totalDays > 1 ? 's' : ''}`;
            }
        }

        nextRenewal = renewalDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return {
        subscriptionStatus,
        nextRenewal,
        timeRemaining,
    };
}
