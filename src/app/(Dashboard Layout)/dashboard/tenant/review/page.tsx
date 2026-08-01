import { myRentalReq } from "@/server/rental/rental.service";
import PropertyReviewCard from "./_components/propertyReviewCard";

export default async function ReviewPage() {
    const result = await myRentalReq();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Property <span className="text-primary">Review</span>
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Submit your property reviews and feedback.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {result.data?.map((rental) => (
                    <PropertyReviewCard
                        key={rental.id}
                        rental={rental}
                    />
                ))}
            </div>

        </div>
    );
}