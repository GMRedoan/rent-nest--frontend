"use client";

import Animate from "@/components/reusable/Animate";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/validation/auth.schema";
import { login } from "@/server/auth/auth.service";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/reusable/toast";
import { useAuth } from "@/provider/AuthProvider";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (payload: LoginData) => {
        try {
            const result = await login(payload);

            if (result.success) {
                router.push("/");
                Swal.fire({
                    title: "Welcome Back",
                    text: "You Successfully Logged in your account",
                    icon: "success",
                    confirmButtonColor: "#4CAF50"
                });
                await refreshUser();
                reset();
            }else {
                Toast({
                    icon: "error",
                    title: result?.message || "Login failed",
                });
            }
        } catch (error) {
            console.error("LOGIN ERROR:", error);
            return error;
        }
    };

    return (
        <section className="flex items-center justify-center px-6 py-12 bg-background">
            <Animate type="fadeLeft" className="w-full max-w-md">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold">Welcome Back</h2>

                        <p className="text-muted-foreground mt-2">
                            Login to continue managing your properties.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label>Email</Label>

                            <div className="relative">
                                {/* <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /> */}

                                <Input
                                    {...register("email")}
                                    placeholder="Enter your email"
                                    className="pl-11 h-12"
                                />
                            </div>

                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>

                            <div className="relative">
                                {/* <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /> */}

                                <Input
                                    type="password"
                                    {...register("password")}
                                    placeholder="Enter your password"
                                    className="pl-11 h-12"
                                />
                            </div>

                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            className="w-full h-12 text-base"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing In..." : "Login"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Don not have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary font-semibold hover:underline"
                        >
                            Create one
                        </Link>
                    </div>
                </div>
            </Animate>
        </section>
    );
}