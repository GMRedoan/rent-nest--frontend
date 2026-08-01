import { getPropertyReviews } from "@/server/review/review.service";
import LandlordReviewCard from "./_components/landlordReviewCard";

export default async function ReviewsPage() {
    const result = await getPropertyReviews();
    const reviews = result.data ?? [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Property <span className="text-primary">Reviews</span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                    See what tenants are saying about your properties.
                </p>
            </div>
            {
                reviews.length === 0 ? (
                    <div className="rounded-xl border p-10 text-center">
                        <h2 className="font-semibold">
                            No Reviews Yet
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Tenant reviews will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {
                            reviews.map((review) => (
                                <LandlordReviewCard
                                    key={review.id}
                                    review={review}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}