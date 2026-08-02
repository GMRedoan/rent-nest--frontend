import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">

                <Loader2 className="h-10 w-10 animate-spin text-primary" />

            </div>


            <div className="mt-6 text-center">

                <h1 className="text-3xl font-bold tracking-tight">
                    RentNest
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Finding the perfect place for you...
                </p>

            </div>


            <div className="mt-8 flex gap-2">

                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />

                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />

                <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />

            </div>

        </div>
    );
}