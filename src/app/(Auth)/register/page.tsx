import RegisterBanner from "@/components/home/auth/RegisterBanner";
import RegisterForm from "@/components/home/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen grid lg:grid-cols-2">
            <RegisterForm />
            <RegisterBanner />
        </main>
    );
}