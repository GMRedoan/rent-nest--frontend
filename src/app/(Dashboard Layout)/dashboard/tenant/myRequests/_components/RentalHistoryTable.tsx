"use client";

import { format } from "date-fns";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMyRentalHistory } from "@/types/rental/rental";
import { CreditCard, FileX, Wallet } from "lucide-react";
import { useState } from "react";
import RentalDetailsModal from "./rentalDetailsModal";
import Animate from "@/components/reusable/Animate";
import { createBkashPayment, createPayment } from "@/server/payment/payment.service";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/reusable/Pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Props {
    requests: IMyRentalHistory[];
}

export default function RentalHistoryTable({
    requests,
}: Props) {
    const [selectedRequest, setSelectedRequest] =
        useState<IMyRentalHistory | null>(null);
    const [open, setOpen] = useState(false);

    const handleView = (request: IMyRentalHistory) => {
        setSelectedRequest(request);
        setOpen(true);
    };

    const handleStripePayment = async (rentalRequestId: string) => {
      await createPayment({
        rentalRequestId,
      });
    };

    const handleBkashPayment = async (rentalRequestId: string) => {
      await createBkashPayment({
        rentalRequestId,
      });
    };

        const {
            currentPage,
            setCurrentPage,
            totalPages,
            paginatedData: paginatedRequests,
        } = usePagination({
            data: requests,
            itemsPerPage: 10,
        });
 
    if (paginatedRequests.length === 0){
        return (
            <div className="flex flex-col items-center py-20">
                <FileX className="mb-4 h-14 w-14 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                    No Rental Requests
                </h3>

                <p className="mt-2 text-muted-foreground">
                    You have not requested any property yet.
                </p>

                <Button asChild className="mt-6">
                    <Link href="/properties">
                        Browse Properties
                    </Link>
                </Button>
            </div>
        )
    }
    return (
      <>
        <Animate className="rounded-2xl border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Request Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.map((request) => (
                <TableRow key={request.id}>
                  {/* Property */}

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold">
                          {request.property.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          ৳{request.property.price}/month
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(request.startDate), "dd MMM yyyy")}
                  </TableCell>

                  <TableCell>
                    {request.endDate
                      ? format(new Date(request.endDate), "dd MMM yyyy")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "APPROVED"
                          ? "default"
                          : request.status === "PENDING"
                            ? "pending"
                            : "destructive"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {request.payment?.status === "PAID" ? (
                      <Button
                        size="sm"
                        disabled
                        className="bg-green-600! px-4 py-4!"
                      >
                        Paid
                      </Button>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={request.status !== "APPROVED"}
                          >
                            Pay Now
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-44">
                          {/* Stripe Payment */}
                          <DropdownMenuItem
                            onClick={() => handleStripePayment(request.id)}
                            className="cursor-pointer gap-2"
                          >
                            <CreditCard className="h-4 w-4 text-indigo-500" />
                            <span>Pay with Stripe</span>
                          </DropdownMenuItem>

                          {/* bKash Payment */}
                          <DropdownMenuItem
                            onClick={() => handleBkashPayment(request.id)}
                            className="cursor-pointer gap-2"
                          >
                            <Wallet className="h-4 w-4 text-pink-600" />
                            <span>Pay with bKash</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleView(request)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Animate>
        {/* pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <RentalDetailsModal
          open={open}
          onOpenChange={setOpen}
          request={selectedRequest}
        />
      </>
    );
}