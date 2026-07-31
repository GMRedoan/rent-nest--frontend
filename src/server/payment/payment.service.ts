"use server";

import serverFetch from "@/lib/serverFetch";
import { GetPaymentHistoryResponse } from "@/types/payment/payment";

export const myPaymentHistory = async () => {
    const res = await serverFetch.get("/payments") as GetPaymentHistoryResponse;
    if (!res.success) {
        return {
            success: false,
            message: res.message,
            data: null,
        };
    }
    return {
        success: true,
        data: res.data.payments,
    };
};