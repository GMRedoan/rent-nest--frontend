"use client";

import { format } from "date-fns";
import { FileX } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { IPaymentHistory } from "@/types/payment/payment";
import Animate from "@/components/reusable/Animate";

interface Props {
    payments: IPaymentHistory[];
}

export default function PaymentHistoryTable({
    payments,
}: Props) {
    if (payments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <FileX className="mb-4 h-14 w-14 text-muted-foreground" />

                <h2 className="text-xl font-semibold">
                    No Payment History
                </h2>

                <p className="mt-2 text-center text-muted-foreground">
                    Your completed payments will appear here.
                </p>
            </div>
        );
    }

    return (
        <Animate className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Intent</TableHead>
                        <TableHead>Paid On</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell className="font-medium">
                                #{payment.id.slice(0, 8)}
                            </TableCell>

                            <TableCell className="font-semibold">
                                ৳{payment.amount.toLocaleString()}
                            </TableCell>
                            <TableCell
                                className="max-w-45 truncate"
                                title={payment.stripePaymentIntentId}
                            >
                                {payment.stripePaymentIntentId.slice(0, 18)}...
                            </TableCell>

                            <TableCell>
                                {format(
                                    new Date(payment.createdAt),
                                    "dd MMM yyyy"
                                )}
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        payment.status === "PAID"
                                            ? "default"
                                            : payment.status === "FAILED"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                >
                                    {payment.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Animate>
    );
}