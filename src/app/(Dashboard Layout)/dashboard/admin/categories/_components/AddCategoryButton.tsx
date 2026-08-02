// AddCategoryButton.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddCategoryModal from "./AddCategoryModal";

export default function AddCategoryButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Category
            </Button>

            <AddCategoryModal
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}