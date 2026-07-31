"use server";

import serverFetch from "@/lib/serverFetch";
import { CreateRentalRequestResponse, IRentalReq } from "@/types/rental/rental";

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