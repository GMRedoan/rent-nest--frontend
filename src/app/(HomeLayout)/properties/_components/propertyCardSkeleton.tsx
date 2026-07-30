import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-2xl border-0 shadow-md">

            {/* Image */}
            <Skeleton className="h-64 w-full rounded-none" />

            <div className="space-y-4 p-5">

                {/* Title */}
                <Skeleton className="h-7 w-3/4" />

                {/* Location */}
                <Skeleton className="h-4 w-1/2" />

                {/* Price */}
                <Skeleton className="h-8 w-32" />

                {/* Date */}
                <Skeleton className="h-4 w-40" />

                {/* Button */}
                <Skeleton className="h-11 w-full rounded-lg" />

            </div>
        </Card>
    );
}