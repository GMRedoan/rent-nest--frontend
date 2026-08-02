"use server";

import serverFetch from "@/lib/serverFetch";
import { CreateRentalRequestResponse, IRentalReq, myRentalReqRes, UpdateRentalReqStatusResponse } from "@/types/rental/rental";

export const createRentalReq = async (payload : IRentalReq) => {
        try {
            const res = await serverFetch.post("/rentals", payload) as CreateRentalRequestResponse;

            if (!res.success || !res.data) {
                return {
                    success: false,
                    message: res.message,
                    data: null,
                };
            }
            return {
                success: true,
                data: res.data.rentalRequest,
            };
        } catch (error) {
            console.error("CREATE RENTAL REQUEST ERROR:", error);
            return {
                success: false,
                message: (error as Error).message ?? "Something went wrong.",
                data: null,
            };
        }
};

export const myRentalReq = async () => {
    try {
        const res = await serverFetch.get("/rentals") as myRentalReqRes;

        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message,
                data: null,
            };
        }
        return {
            success: true,
            data: res.data.rentalRequests,
        }
    } catch (error) {
        console.error("MY RENTAL REQUEST ERROR:", error);
        return {
            success: false,
            message: (error as Error).message ?? "Something went wrong.",
            data: null,
        };
    }
}

export const myPropertiesRentalReq = async () => {
    try {
        const res = await serverFetch.get("/landlord/requests") as myRentalReqRes;

        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message,
                data: null,
            };
        }
        return {
            success: true,
            data: res.data.rentalRequests,
        }
    } catch (error) {
        console.error("MY PROPERTIES RENTAL REQUEST ERROR:", error);
        return {
            success: false,
            message: (error as Error).message ?? "Something went wrong.",
            data: null,
        };
    }
}

export const updateRentalReqStatus = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    try {
        const res = await serverFetch.patch(`/landlord/requests/${requestId}`, { status }) as UpdateRentalReqStatusResponse;

        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message,
                data: null,
            };
        }
        return {
            success: true,
            data: res.data.rentalRequest,
        }
    } catch (error) {
        console.error("UPDATE RENTAL REQUEST STATUS ERROR:", error);
        return {
            success: false,
            message: (error as Error).message ?? "Something went wrong.",
            data: null,
        };
    }
}

export const allRentalRequest = async () => {
    try {
        const res = await serverFetch.get("/admin/rentals") as myRentalReqRes;

        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message,
                data: null,
            };
        }
        return {
            success: true,
            data: res.data.rentalRequests,
        }
    } catch (error) {
        console.error("ALL RENTAL REQUEST ERROR:", error);
        return {
            success: false,
            message: (error as Error).message ?? "Something went wrong.",
            data: null,
        };
    }
}