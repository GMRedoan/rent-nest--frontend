"use server"

import serverFetch from "@/lib/serverFetch"
import { GetUserResponse, IAllUsersResponse, IUpdateProfile, IUpdateProfileResponse, IUpdateUserStatusResponse } from "@/types/auth/auth";

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

export const allUsers = async () => {
    const res = await serverFetch.get<IAllUsersResponse>("/admin/users");
    if (!res.success || !res.data?.users) {
        return {
            success: false,
            message: res.message,
            data:  null
        };
    }

    return {
        success: true,
        data: res.data.users
    };
}  

export const updateUserStatus = async (userId: string, status: string) => {
    const res = await serverFetch.patch(`/admin/users/${userId}`, { status }) as IUpdateUserStatusResponse;
    if (!res.success || !res.data?.user) {
        return {
            success: false,
            message: res.message,
        };
    }

    return {    
        success: true,
        message: "User status updated successfully.",
        data: res.data.user
    };
}