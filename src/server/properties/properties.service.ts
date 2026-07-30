"use server"

import serverFetch from "@/lib/serverFetch";
import { GetPropertiesResponse} from "@/types/property/property";

export const getProperties = async () => {
    try {
        const res = await serverFetch.get("/properties") as GetPropertiesResponse;

        if (!res.success) {
            return {
                success: false,
                message: res.message
            }
        }

        return {
            success: true,
            data: res.data.properties,
            meta: res.data.meta
        }
    } catch (error) {
        console.error("GET PROPERTIES ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}

export const getPropertyById = async (id: string) => {
    try {
        const res = await serverFetch.get(`/properties/${id}`) as GetPropertiesResponse;;


        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message ?? "Property not found",
                data: null,
            };
        }


        return {
            success: true,
            data: res.data.properties,
        };


    } catch (error) {
        console.error("GET PROPERTY ERROR:", error);

        return {
            success: false,
            message: "Failed to load property",
            data: null,
        };
    }
};