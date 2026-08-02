import { allRentalRequest } from '@/server/rental/rental.service';
import AdminRentalRequestTable from './_components/AdminRentalRequestTable';

const page = async () => {
    const result = await allRentalRequest();
    const rentalRequests = result?.data;
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Rental <span className="text-primary">History</span>
                </h1>

                <p className="mt-2 text-muted-foreground">
                    Track all rental requests, payment status,
                    and booking history.
                </p>
            </div>

            <AdminRentalRequestTable requests={rentalRequests ?? []} />
        </div>
    );
};

export default page;