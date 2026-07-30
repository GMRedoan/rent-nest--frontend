import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";

const protectedRoutes = [
    "/dashboard",
]

const authRoutes = [
    "/login",
    "/register",
]

export async function proxy(request : NextRequest) {
    const  pathname  = request.nextUrl.pathname;
    const accessToken = request.cookies.get('accessToken')?.value

    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null 
    const userRole = decodedToken?.role;

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // logged in user can not access login drawer
    if (decodedToken && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // If the user is not logged in and the route is protected, redirect to the login drawer
    if (!decodedToken && isProtected) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    } else if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }
     else if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}