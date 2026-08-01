"use server";

import serverFetch from "@/lib/serverFetch";
import { CreateReviewResponse, GetPropertyReviewsResponse, ICreateReviewPayload } from "@/types/review/review";
 
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

export const getPropertyReviews = async () => {
    try {
        const res = await serverFetch.get("/landlord/reviews") as GetPropertyReviewsResponse;
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
            data: res.data.reviews
        }
    } catch (error) {
        console.error("GET PROPERTY REVIEWS ERROR:", error);
        return {
            success: false,
            message: (error as Error).message ?? "Something went wrong.",
        };
    }
}