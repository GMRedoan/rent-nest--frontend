"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { createRentalReq } from "@/server/rental/rental.service";
import { IRentalReq } from "@/types/rental/rental";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "../reusable/toast";
import { IProperty } from "@/types/property/property";

interface Props {
    property: IProperty;
}

export default function RentalRequestModal({ property }: Props) {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IRentalReq>({
        defaultValues: {
            message: "",
            startDate: undefined,
            endDate: undefined,
        },
    });

    const onSubmit = async (data: IRentalReq) => {
        const payload = {
            ...data,
            propertyId : property.id,
        };
        const result = await createRentalReq(payload);
        if (result.success) {
            Toast({
                icon: "success",
                title: "Rental request sent successfully",
            });
            reset();
            setOpen(false);
        } else {
            Toast({
                icon: "error",
                title: result?.message || "Rental request failed",
            })
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                        size="lg"
                        className="w-full"
                        disabled={property.status === "RENTED"}
                    >
                        {property.status === "RENTED"
                            ? "Already Rented"
                            : "Request Rental"
                        }

                    </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg p-8">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl">Request Rental</DialogTitle>

                    <DialogDescription>
                        Fill in the information below to send your rental
                        request.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Message */}
                    
                    <div >
                        <label className="text-sm font-medium">Message (optional)</label>
                        <Textarea
                            {...register("message", {
                            })}
                            rows={5}
                            className="mt-2"
                            placeholder="Write why you want to rent this property..."
                        />
                        {errors.message && (
                            <p className="text-sm text-destructive">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    {/* Start Date */}

                    <Controller
                        control={control}
                        name="startDate"
                        rules={{
                            required: "Start date is required",
                        }}
                        render={({ field }) => (
                            <div className="space-y-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />

                                            {field.value
                                                ? format(
                                                    field.value,
                                                    "PPP"
                                                )
                                                : "Select start date"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                        />
                                    </PopoverContent>
                                </Popover>

                                {errors.startDate && (
                                    <p className="text-sm text-destructive">
                                        {errors.startDate.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    {/* End Date */}

                    <Controller
                        control={control}
                        name="endDate"
                        rules={{
                            required: "End date is required",
                        }}
                        render={({ field }) => (
                            <div className="space-y-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />

                                            {field.value
                                                ? format(
                                                    field.value,
                                                    "PPP"
                                                )
                                                : "Select end date"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                        />
                                    </PopoverContent>
                                </Popover>

                                {errors.endDate && (
                                    <p className="text-sm text-destructive">
                                        {errors.endDate.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : "Submit Request"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}