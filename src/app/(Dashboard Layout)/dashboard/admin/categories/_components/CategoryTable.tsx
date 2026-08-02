"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    FolderOpen,
    CalendarDays,
    Pencil,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ICategory } from "@/types/category/category";
import Animate from "@/components/reusable/Animate";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
interface Props {
    categories: ICategory[];
}

export default function CategoryCards({
    categories,
}: Props) {
    const [selectedCategory, setSelectedCategory] =
        useState<ICategory | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleEdit = (category: ICategory) => {
        setSelectedCategory(category);
        setEditOpen(true);
    };

    const handleDelete = (category: ICategory) => {
        setSelectedCategory(category);
        setDeleteOpen(true);
    };

    if (categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border py-20">
                <FolderOpen className="mb-4 h-14 w-14 text-muted-foreground" />
                <h3 className="text-xl font-semibold">
                    No Categories Found
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Start by creating your first property category.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <Animate type="zoom"
                        key={category.id}
                        className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                    >
                        {/* Icon */}
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FolderOpen className="h-7 w-7" />
                        </div>

                        {/* Name */}
                        <h3 className="line-clamp-1 text-xl font-bold">
                            {category.name}
                        </h3>

                        <Badge
                            variant="secondary"
                            className="mt-3"
                        >
                            Property Category
                        </Badge>

                        {/* Dates */}
                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="h-4 w-4" />
                                <span>
                                    Created:{" "}
                                    {format(
                                        new Date(category.createdAt),
                                        "dd MMM yyyy"
                                    )}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="h-4 w-4" />
                                <span>
                                    Updated:{" "}
                                    {format(
                                        new Date(category.updatedAt),
                                        "dd MMM yyyy"
                                    )}
                                </span>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex gap-3">

                            <Button
                                className="flex-1"
                                variant="link"
                                onClick={() =>
                                    handleEdit(category)
                                }
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                className="flex-1"
                                variant="destructive"
                                onClick={() =>
                                    handleDelete(category)
                                }
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>

                        </div>
                    </Animate>
                ))}
            </div>

            {selectedCategory && (
                <>
                    <EditCategoryModal
                        open={editOpen}
                        onOpenChange={setEditOpen}
                        category={selectedCategory}
                    />

                    <DeleteCategoryModal
                        open={deleteOpen}
                        onOpenChange={setDeleteOpen}
                        category={selectedCategory}
                    />
                </>
            )}
        </>
    );
}