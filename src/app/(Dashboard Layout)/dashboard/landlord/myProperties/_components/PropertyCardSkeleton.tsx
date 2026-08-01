import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <Skeleton className="h-56 w-full" />

            <div className="space-y-4 p-5">
                <Skeleton className="h-6 w-3/4" />

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                </div>

                <div className="flex justify-between">
                    <Skeleton className="h-10 w-[48%]" />
                    <Skeleton className="h-10 w-[48%]" />
                </div>
            </div>
        </div>
    );
}