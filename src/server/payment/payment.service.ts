"use server";

import serverFetch from "@/lib/serverFetch";
import { CreatePaymentResponse, GetPaymentHistoryResponse, ICreatePayment } from "@/types/payment/payment";
import { redirect } from "next/navigation";

export const createPayment = async (payload: ICreatePayment) => {
        const res = await serverFetch.post("/payments/create", payload) as CreatePaymentResponse;
        if (!res.success) {
            return {
                success: false,
                message: res.message,
                data: null,
            };
        }
        redirect(
            res.data.payment.checkoutUrl
        );
}

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