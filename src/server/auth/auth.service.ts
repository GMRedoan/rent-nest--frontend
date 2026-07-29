"use server"

import serverFetch from "@/lib/serverFetch";
import { ICreateUser, ILoginPayload, Response } from "@/types/auth/auth";
import { createUserSchema, loginSchema } from "@/validation/auth.schema";
import { cookies } from "next/headers";

// register
export const registerUser = async (payload: ICreateUser) => {
    try {
        const validatedPayload = await createUserSchema.safeParseAsync(payload);

        if (!validatedPayload.success) {
            return {
                success: false,
                message: validatedPayload.error.message,
            };
        }
        const result = await serverFetch.post<Response>("/auth/register", validatedPayload.data);

        if (!result.success || !result.data) {
            return {
                success: false,
                message: result.message,
            };
        }
        return {
            success: true,
            message: result.message,
        };

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        };
    }
} 

// login
export const login = async (payload: ILoginPayload) => {
    try {
        const validatedPayload = await loginSchema.safeParseAsync(payload);

        if (!validatedPayload.success) {
            return {
                success: false,
                message: validatedPayload.error.message,
            };
        }
        const result = await serverFetch.post<Response>("/auth/login", validatedPayload.data);

        if (!result.success || !result.data) {
            return {
                success: false,
                message: result.message,
            };
        }

        const { accessToken } = result.data;

        const cookieStore = await cookies();

        // store token
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return {
            success: true,
            message: result.message,
            accessToken,
        };

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return {
            success: false,
            message: "Login failed. Please try again.",
        };
    }
}

// log out
export async function logoutAction() {
    try {
        const cookieStore = await cookies();

        // remove token from cookies
        cookieStore.delete("accessToken");
        return {
            success: true,
            message: "Logged out successfully",
        };
    } catch (err) {
        console.error("LOGOUT ERROR:", err);
        return {
            success: false,
            message: "Logout failed. Please try again.",
        };
    }
}
