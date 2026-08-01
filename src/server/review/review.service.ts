"use server";

import serverFetch from "@/lib/serverFetch";
import { CreateReviewResponse, ICreateReviewPayload } from "@/types/review/review";
 
export const createReview = async (payload: ICreateReviewPayload) => {
    try {
        const res = await serverFetch.post("/reviews", payload) as CreateReviewResponse;
        if(!res.success || !res.data) {
            return {
                success: false,
                message: res.message,
                data: null
            }
        }
        return {
            success: true,
            message: res.message,
            data: res.data.review
        }
    } catch (error) {
        console.error("CREATE REVIEW ERROR:", error);
        return {
            success: false,
            message: (error as Error).message ?? "Something went wrong.",
        };
    }      
};