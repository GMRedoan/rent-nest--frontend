import { myPaymentHistory } from '@/server/payment/payment.service';
import PaymentHistoryTable from './_components/PaymentHistoryTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Payment History | Dashboard",
    description: "A property rental app",
};


const page = async () => {
    const result = await myPaymentHistory();
    const payments = result?.data;   
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Payment <span className="text-primary">History</span>
                </h1>

                <p className="mt-2 text-muted-foreground">
                    View all your rental payments and transaction details.
                </p>
            </div>

            <PaymentHistoryTable payments={payments ?? []} />
        </div>
    );
};

export default page;