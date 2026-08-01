"use server"

import serverFetch from "@/lib/serverFetch"
import { GetUserResponse, IUpdateProfile, IUpdateProfileResponse } from "@/types/auth/auth";

export const getUser = async () => {
    const res = await serverFetch.get<GetUserResponse>("/auth/me");
    if (!res.success || !res.data.profile) {
        return {
            success: false,
            message: res.message,
            data:  null
        };
    }

    return {
        success: true,
        data: res.data.profile
    };
}

export const updateUser = async (userId: string, payload: IUpdateProfile) => {
    const res = await serverFetch.patch<IUpdateProfileResponse>(`/auth/${userId}`, payload);
    if (!res.success || !res.data?.user) {
        return {
            success: false,
            message: res.message,
            data:  null
        };
    }

    return {
        success: true,
        data: res.data.user
    };
}