"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
    FaEnvelope,
    FaLock,
    FaPhone,
    FaUser,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Animate from "@/components/reusable/Animate";
import { createUserSchema } from "@/validation/auth.schema";
import { registerUser } from "@/server/auth/auth.service";
import { Toast } from "@/components/reusable/toast";
import { useAuth } from "@/provider/AuthProvider";
import { MdArrowBackIos } from "react-icons/md";

type FormData = z.infer<typeof createUserSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            role: "TENANT",
        },
    });

    const role = watch("role");

    const onSubmit = async (payload: FormData) => {
        const result = await registerUser(payload)  

        if (!result.success) {
            Toast({
                icon: "error",
                title: result?.message || "Registration failed",
            });
            return;
        }

        Toast({
            icon: "success",
            title: "Account created successfully, please login",
        });
        await refreshUser();
        router.push("/login");
    };

    return (
        <section className="flex items-center justify-center bg-background px-6 py-10">
            <div className="relative">
                <Link
                    className="absolute bottom-80 -left-20 text-foreground hover:text-primary flex items-center"
                    href={"/"}>
                    <MdArrowBackIos />
                    Home
                </Link>
            </div>

            <Animate className="w-full max-w-lg" type="fadeRight">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Create your account
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            Join RentNest as a tenant or landlord.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Name */}
                        <div className="space-y-2">
                            <Label>Name</Label>

                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    {...register("name")}
                                    className="pl-11 h-12"
                                    placeholder="John Doe"
                                />
                            </div>

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label>Email</Label>

                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    {...register("email")}
                                    className="pl-11 h-12"
                                    placeholder="john@email.com"
                                />
                            </div>

                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label>Phone</Label>

                            <div className="relative">
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                type="number"
                                    {...register("phone")}
                                    className="pl-11 h-12"
                                    placeholder="+8801XXXXXXXXX"
                                />
                            </div>

                            {errors.phone && (
                                <p className="text-sm text-destructive">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label>Password</Label>

                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    type="password"
                                    {...register("password")}
                                    className="pl-11 h-12"
                                />
                            </div>

                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <Label>Register As</Label>

                            <Select
                                value={role}
                                onValueChange={(value) =>
                                    setValue(
                                        "role",
                                        value as "TENANT" | "LANDLORD"
                                    )
                                }
                            >
                                <SelectTrigger className="h-12">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="TENANT">
                                        Tenant
                                    </SelectItem>

                                    <SelectItem value="LANDLORD">
                                        Landlord
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            className="h-12 w-full text-white text-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-primary hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </Animate>
        </section>
    );
}