"use server";

import serverFetch from "@/lib/serverFetch";
import { GetCategoriesResponse } from "@/types/category/category";

export const getCategories = async () => {
    try {
        const res = await serverFetch.get("/categories") as GetCategoriesResponse;

        if (!res.success) {
            return {
                success: false,
                message: res.message
            }
        }

        return {
            success: true,
            data: res.data.categories
        }
    } catch (error) {
        console.error("GET CATEGORIES ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}