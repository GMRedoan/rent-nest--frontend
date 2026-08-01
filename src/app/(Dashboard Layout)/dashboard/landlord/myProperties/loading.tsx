import PropertyCardSkeleton from "./_components/PropertyCardSkeleton";

export default function Loading() {
    return (
        <section className="space-y-18">
            {/* Header */}

            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
                    <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="h-11 w-40 animate-pulse rounded-lg bg-muted" />
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