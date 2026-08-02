import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">

            {/* Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Skeleton className="h-10 w-full max-w-md" />
                <Skeleton className="h-5 w-32" />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border">
                <div className="space-y-4 p-6">

                    {/* Header */}
                    <div className="grid grid-cols-5 gap-6 border-b pb-4">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="ml-auto h-5 w-16" />
                    </div>

                    {/* Rows */}
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 items-center gap-6 py-3"
                        >
                            {/* User */}
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-11 w-11 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                            </div>

                            {/* Role */}
                            <Skeleton className="h-7 w-24 rounded-full" />

                            {/* Status */}
                            <Skeleton className="h-7 w-24 rounded-full" />

                            {/* Joined */}
                            <Skeleton className="h-4 w-24" />

                            {/* Action */}
                            <div className="flex justify-end">
                                <Skeleton className="h-9 w-32 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
            </div>

        </div>
    );
}