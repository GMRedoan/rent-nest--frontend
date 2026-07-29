import LoginBanner from "@/components/home/auth/LoginBanner";
import LoginForm from "@/components/home/auth/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen grid lg:grid-cols-2">
            <LoginBanner />
            <LoginForm />
        </main>
    );
}