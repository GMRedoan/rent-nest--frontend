"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

import Animate from "@/components/reusable/Animate";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
            <Animate type="zoom" className="">
                    <div className="space-y-6 text-center lg:text-left">

                        <p className="text-8xl font-black tracking-tight text-primary">
                            404
                        </p>

                        <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                            Oops! Page Not Found.
                        </h1>

                        <p className="max-w-lg text-lg text-muted-foreground">
                            The page you are looking for does not exist, may have
                            been moved, or you don not have permission to access
                            it.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">

                            <Button asChild size="lg">
                                <Link href="/">
                                    <Home className="mr-2 h-5 w-5" />
                                    Back to Home
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => router.back()}
                                className="py-5!"
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Go Back
                            </Button>

                        </div>

                    </div>
            </Animate>
        </main>
    );
}