"use server"

import serverFetch from "@/lib/serverFetch";
import { createPropertyResponse, deletePropertyResponse, GetPropertiesResponse, GetPropertyResponse, IProperty} from "@/types/property/property";

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
        const res = await serverFetch.get(`/properties/${id}`) as GetPropertyResponse;
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

export const getMyProperties = async () => {
    try {
        const res = await serverFetch.get("/landlord/properties") as GetPropertiesResponse;

        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message
            }
        }
        return {
            success: true,
            data: res.data.properties,
        }
    } catch (error) {
        console.error("GET MY PROPERTIES ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}

export const createProperty = async (payload: IProperty) => {
    try {
        const res = await serverFetch.post("/landlord/properties", payload) as createPropertyResponse;
        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message
            }
        }
        return {
            success: true,
            data: res.data.property,
        }
    } catch (error) {
        console.error("CREATE PROPERTY ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}

export const updateProperty = async (propertyId: string, payload: IProperty) => {
    try {
        const res = await serverFetch.put(`/landlord/properties/${propertyId}`, payload) as createPropertyResponse;
        if (!res.success || !res.data) {
            return {
                success: false,
                message: res.message
            }
        }
        return {
            success: true,
            data: res.data.property,
        }
    } catch (error) {
        console.error("UPDATE PROPERTY ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}
    
export const deleteProperty = async (propertyId: string) => {
    try {
        const res = await serverFetch.delete(`/landlord/properties/${propertyId}`) as deletePropertyResponse;
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
        console.error("DELETE PROPERTY ERROR:", error);
        return { success: false, message: (error as Error).message ?? 'Unknown error' };
    }
}        