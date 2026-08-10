"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { IReview } from "@/types/review/review";

interface ReviewCardProps {
    review: IReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const formattedDate = new Date(review.createdAt).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">

            {/* Decorative Quote */}
            <div className="absolute right-5 top-14 text-primary/5 transition-colors duration-300 group-hover:text-primary/10">
                <Quote className="h-20 w-20 fill-current" />
            </div>

            <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 dark:border-amber-500/20 dark:bg-amber-500/10">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    5.0
                </span>
            </div>

            {/* User */}
            <div className="relative flex items-center gap-4 pr-20">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/10">
                    <Image
                        src={review.tenant.profilePhoto || ""}
                        alt={review.tenant.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div>
                    <h4 className="font-semibold text-foreground">
                        {review.tenant.name}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                        Verified Tenant
                    </p>
                </div>
            </div>

            {/* Review */}
            <div className="relative mt-6">
                <p className="text-[15px] leading-7 text-muted-foreground">
                    {review.comment}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Tenant Review
                </span>

                <span className="text-xs text-muted-foreground">
                    {formattedDate}
                </span>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </div>
    );
}
