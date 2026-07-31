import { myRentalReq } from "@/server/rental/rental.service";
import RentalHistoryTable from "./_components/RentalHistoryTable";

const page = async () => {
    const result = await myRentalReq();
    const rentalRequests = result?.data
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Rental History
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Track all your rental requests, payment status,
                    and booking history.
                </p>
            </div>

            <RentalHistoryTable requests={rentalRequests ?? []} />
        </div>
    );
};

export default page;