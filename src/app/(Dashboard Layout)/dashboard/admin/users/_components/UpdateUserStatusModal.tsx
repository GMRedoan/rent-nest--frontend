"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Ban, ShieldCheck, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserStatus } from "@/server/user/user.service";
import { Toast } from "@/components/reusable/toast";
import { IUserProfile } from "@/types/auth/auth";
import { Badge } from "@/components/ui/badge";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: IUserProfile;
}

export default function UpdateUserStatusModal({
    open,
    onOpenChange,
    user,
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const nextStatus =
        user.status === "ACTIVE"
            ? "BANNED"
            : "ACTIVE";

    const handleUpdate = () => {
        startTransition(async () => {
            const result = await updateUserStatus(
                user.id,
                nextStatus
            );

            if (result.success) {
                Toast({
                    icon: "success",
                    title: `User ${nextStatus === "ACTIVE"
                            ? "activated"
                            : "banned"
                        } successfully.`,
                });

                onOpenChange(false);
                router.refresh();
            } else {
                Toast({
                    icon: "error",
                    title: result.message,
                });
            }
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {user.status === "ACTIVE"
                            ? "Ban User"
                            : "Activate User"}
                    </DialogTitle>

                    <DialogDescription>
                        This action will update the users account status.
                    </DialogDescription>
                </DialogHeader>
                <div className="my-6 flex items-center gap-4 rounded-xl border p-4">
                    <Avatar className="h-14 w-14">
                        <AvatarImage
                            src={user.profilePhoto ?? ""}
                        />
                        <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="font-semibold">
                            {user.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                        <div className="flex items-center gap-2">
                            <Badge variant={
                                user.role === "ADMIN"
                                    ? "default"
                                    : user.role === "LANDLORD"
                                    ? "outline"
                                    : "link"
                            }>
                                {user.role}
                            </Badge>
                            <Badge variant={
                                user.status === "BANNED"
                                    ? "destructive"
                                    :  "default"
                                        }>
                                {user.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                    {user.status === "ACTIVE" ? (
                        <>
                            <Ban className="mb-2 h-5 w-5 text-red-500" />

                            The user will no longer be able to access the
                            platform until the account is activated again.
                        </>
                    ) : (
                        <>
                            <ShieldCheck className="mb-2 h-5 w-5 text-green-600" />

                            The user will regain access to the platform
                            immediately after activation.
                        </>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                        className="p-5"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleUpdate}
                        disabled={isPending}
                        variant={
                            user.status === "ACTIVE"
                                ? "destructive"
                                : "default"
                        }
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : user.status === "ACTIVE" ? (
                            <>
                                <Ban className="mr-2 h-4 w-4" />
                                Ban User
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Activate User
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}