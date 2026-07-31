export interface IPaymentHistory {
    id: string;
    amount: number;
    status: "PAID" | "PENDING" | "FAILED";
    stripeSessionId: string;
    stripePaymentIntentId: string;
    tenantId: string;
    rentalRequestId: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetPaymentHistoryResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        payments: IPaymentHistory[];
    };
}