"use server";

import serverFetch from "@/lib/serverFetch";
import { createCategoryResponse, deleteCategoryResponse, GetCategoriesResponse, ICategory } from "@/types/category/category";

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

export const createCategory = async (payload: ICategory) => {
    try {
        const res = await serverFetch.post("/admin/categories", payload) as createCategoryResponse;
        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message
            }
        }
        return {
            success: true,
            data: res.data.category,
        }
    } catch (error) {
        console.error("CREATE CATEGORY ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}

export const updateCategory = async (categoryId: string, payload: ICategory) => {
    try {
        const res = await serverFetch.patch(`/admin/category/${categoryId}`, payload) as createCategoryResponse;
        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message
            }
        }
        return {
            success: true,
            data: res.data.category,
        }
    } catch (error) {
        console.error("UPDATE CATEGORY ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}

export const deleteCategory = async (categoryId: string) => {
    try {
        const res = await serverFetch.delete(`/admin/category/${categoryId}`) as deleteCategoryResponse;
        if (!res.success ) {
            return {
                success: false,
                message: res.message
            }
        }
        return {
            success: true,
            data: null
        }
    } catch (error) {
        console.error("DELETE CATEGORY ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}