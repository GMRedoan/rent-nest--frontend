import { myPropertiesRentalReq } from '@/server/rental/rental.service';
import PropertyRentalRequestTable from './_components/PropertyRentalRequestTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Requests | Rent Nest",
    description: "A property rental app",
};

const page = async () => {
    const result = await myPropertiesRentalReq();
    const requests =  result.data;
    return (
        <div>
            <div className="mb-6 space-y-2">
                <h1 className="text-3xl font-bold">
                    My Property <span className="text-primary">Request</span>
                </h1>
                <p className="text-muted-foreground">
                    Manage all your rental property requests.
                </p>
            </div>

            <PropertyRentalRequestTable requests={requests ?? []} />
        </div>
    );
};

export default page;