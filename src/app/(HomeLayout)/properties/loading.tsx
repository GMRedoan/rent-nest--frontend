import { Skeleton } from "@/components/ui/skeleton";
import PropertyCardSkeleton from "./_components/propertyCardSkeleton";

export default function Loading() {
    return (
        <section className="space-y-38">
            {/* Header */}

            <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center">
                <Skeleton className="h-4 w-36 rounded-full" />

                <Skeleton className="mt-4 h-10 w-4/5 rounded-lg" />

                <Skeleton className="mt-2 h-10 w-3/5 rounded-lg" />

                <Skeleton className="mt-6 h-5 w-full rounded-lg" />

                <Skeleton className="mt-2 h-5 w-11/12 rounded-lg" />

                <Skeleton className="mt-2 h-5 w-2/3 rounded-lg" />
            </div>

            {/* Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <PropertyCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
}

  