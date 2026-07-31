"use server";

import serverFetch from "@/lib/serverFetch";
import { CreateRentalRequestResponse, IRentalReq, myRentalReqRes } from "@/types/rental/rental";

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