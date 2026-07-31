import { Skeleton } from "@/components/ui/skeleton";


export default function Loading() {

    return (

        <section className="container py-30">

            <div className="grid gap-10 lg:grid-cols-2">

                <Skeleton className="h-112 rounded-3xl" />


                <div className="space-y-6">

                    <Skeleton className="h-10 w-3/4" />

                    <Skeleton className="h-5 w-1/2" />

                    <Skeleton className="h-20 w-full" />

                    <Skeleton className="h-12 w-full" />

                </div>

            </div>

        </section>

    );
}