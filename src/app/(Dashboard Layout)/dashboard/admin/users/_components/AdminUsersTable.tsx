/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Ban, ShieldCheck, Users } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserProfile } from "@/types/auth/auth";
import UpdateUserStatusModal from "./UpdateUserStatusModal";
import Animate from "@/components/reusable/Animate";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
    users: IUserProfile[];
}

export default function AdminUsersTable({ users }: Props) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<IUserProfile | null>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = (user: IUserProfile) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const roleOrder: Record<string, number> = {
        ADMIN: 0,
        LANDLORD: 1,
        TENANT: 2,
    };

    const filteredUsers = users.filter((user) => {
        const keyword = search.toLowerCase();

        return (
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword)
        );
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        return roleOrder[a.role] - roleOrder[b.role];
    });

    const ITEMS_PER_PAGE = 6;

    const totalPages = Math.ceil(
        sortedUsers.length / ITEMS_PER_PAGE
    );

    const paginatedUsers = sortedUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border py-20">
                <Users className="mb-4 h-14 w-14 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                    No Users Found
                </h3>

                <p className="mt-2 text-muted-foreground">
                    There are currently no registered users.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* search */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <Input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md"
                />

                <p className="text-sm text-primary/70">
                    {filteredUsers.length} users found
                </p>
            </div>

            <Animate className="overflow-hidden rounded-2xl border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>

                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user.id}>

                                {/* User */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-11 w-11">
                                            <AvatarImage
                                                src={user.profilePhoto ?? ""}
                                            />
                                            <AvatarFallback>
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Role */}
                                <TableCell>
                                    <Badge
                                        variant={
                                            user.role === "ADMIN"
                                                ? "default"
                                                :  user.role === "LANDLORD"
                                                ? "outline"
                                                : "link"
                                        }
                                    >
                                        {user.role}
                                    </Badge>

                                </TableCell>
                                {/* Status */}
                                <TableCell>
                                    <Badge
                                        variant={
                                            user.status === "ACTIVE"
                                                ? "default"
                                                : "destructive"
                                        }
                                        className="gap-1"
                                    >
                                        {user.status === "ACTIVE" ? (
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                        ) : (
                                            <Ban className="h-3.5 w-3.5" />
                                        )}
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                {/* Joined */}

                                <TableCell>

                                    {format(
                                        new Date(user.createdAt),
                                        "dd MMM yyyy"
                                    )}
                                </TableCell>
                                {/* Action */}
                                <TableCell className="text-right">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => handleOpen(user)}
                                    >
                                        Update Status
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Animate>
            {selectedUser && (
                <UpdateUserStatusModal
                    open={open}
                    onOpenChange={setOpen}
                    user={selectedUser}
                />
            )}
            {/* pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent className="space-x-2">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    className={
                                        currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                            {Array.from(
                                { length: totalPages },
                                (_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            isActive={
                                                currentPage === index + 1
                                            }
                                            onClick={() =>
                                                setCurrentPage(index + 1)
                                            }
                                            className="cursor-pointer"
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(
                                                prev + 1,
                                                totalPages
                                            )
                                        )
                                    }
                                    className={
                                        currentPage === totalPages
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </>
    );
}