"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    BadgeCheck,
    Mail,
    Phone,
    Pencil,
    Shield,
    User2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditProfileModal from "./EditProfileModal";
import Animate from "@/components/reusable/Animate";
import { useAuth } from "@/provider/AuthProvider";

export default function ProfileCard() {
    const { user } = useAuth();    
    const [open, setOpen] = useState(false);
    if(!user )
    return null;
    return (
        <>
            <Animate type="zoom" className="overflow-hidden rounded-3xl border bg-background shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between border-b p-8">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-28 w-28 border-4 border-primary/10">
                            <AvatarImage src={user?.profilePhoto ?? undefined} />

                            <AvatarFallback className="text-3xl font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <h2 className="text-3xl font-bold">
                                    {user?.name}
                                </h2>

                                {user?.status === "ACTIVE" && (
                                    <BadgeCheck className="h-5 w-5 text-primary" />
                                )}
                            </div>

                            <div>
                                <Badge
                                    variant={
                                        user?.status === "ACTIVE"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {user?.status}
                                </Badge>
                            </div>

                            <p className="text-muted-foreground">
                                Member since{" "}
                                {format(
                                    new Date(user?.createdAt),
                                    "MMMM yyyy"
                                )}
                            </p>
                        </div>
                    </div>

                    <Button onClick={() => setOpen(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>

                {/* Body */}
                <div className="grid gap-8 p-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 rounded-xl border p-4">
                            <Mail className="h-5 w-5 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>

                                <p className="font-medium">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border p-4">
                            <Phone className="h-5 w-5 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Phone
                                </p>

                                <p className="font-medium">
                                    {user?.phone || "Not added"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 rounded-xl border p-4">
                            <Shield className="h-5 w-5 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Account Role
                                </p>

                                <p className="font-medium">
                                    {user?.role}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-xl border p-4">
                            <User2 className="mt-1 h-5 w-5 text-primary" />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Bio
                                </p>

                                <p className="leading-relaxed">
                                    {user?.bio ||
                                        "No bio has been added yet."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Animate>

            <EditProfileModal
                open={open}
                onOpenChange={setOpen}
                user={user}
                userId={user?.id}
            />
        </>
    );
}