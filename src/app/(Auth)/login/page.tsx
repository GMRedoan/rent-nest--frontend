import LoginBanner from "@/components/home/auth/LoginBanner";
import LoginForm from "@/components/home/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "A property rental app",
};

export default function LoginPage() {
    return (
        <main className="min-h-screen grid lg:grid-cols-2">
            <LoginBanner />
            <LoginForm />
        </main>
    );
}