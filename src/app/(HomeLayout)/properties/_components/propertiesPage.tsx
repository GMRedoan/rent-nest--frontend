/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SearchX } from "lucide-react";
import { IProperty } from "@/types/property/property";
import PropertyCard from "./propertyCard";
import PropertyGridSkeleton from "./PropertyGridSkeleton";

interface Props {
    properties: IProperty[];
    isLoading?: boolean;
}

export default function PropertiesPage({
    properties,
    isLoading = false,
}: Props) {
    const safeProperties = Array.isArray(properties) ? properties : [];

    const [search, setSearch] = useState("");
    const [type, setType] = useState("ALL");
    const [sort, setSort] = useState("newest");
    const filtered = useMemo(() => {
        let data = [...safeProperties];

        data = data.filter((property) => {
            const title = property.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const propertyType =
                type === "ALL"
                    ? true
                    : property.propertyType === type;

            return title && propertyType;
        });
        switch (sort) {
            case "newest":
                data.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
                break;

            case "oldest":
                data.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );
                break;

            case "price-low":
                data.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                data.sort((a, b) => b.price - a.price);
                break;
        }
        return data;
    }, [safeProperties, search, type, sort]);

    return (
        <section className="bg-muted px-8 pt-12 rounded-2xl min-h-screen">

            <div className="mb-10 grid gap-4 md:grid-cols-3">
                <Input
                className="px-6 py-5"
                    placeholder="Search property..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <Select
                    value={type}
                    onValueChange={setType}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="ALL">
                            All Types
                        </SelectItem>
                        <SelectItem value="HOUSE">
                            House
                        </SelectItem>
                        <SelectItem value="APARTMENT">
                            Apartment
                        </SelectItem>
                        <SelectItem value="STUDIO">
                            Studio
                        </SelectItem>
                        <SelectItem value="COMMERCIAL">
                            Commercial
                        </SelectItem>
                        <SelectItem value="ROOM">
                            Room
                        </SelectItem>

                    </SelectContent>
                </Select>

                <Select
                    value={sort}
                    onValueChange={setSort}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="newest">
                            Newest
                        </SelectItem>

                        <SelectItem value="oldest">
                            Oldest
                        </SelectItem>

                        <SelectItem value="price-low">
                            Price Low → High
                        </SelectItem>

                        <SelectItem value="price-high">
                            Price High → Low
                        </SelectItem>

                    </SelectContent>
                </Select>

            </div>

            {
                isLoading ? (
                    <PropertyGridSkeleton />
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center">
                        <SearchX className="mx-auto mb-4 h-12 w-12 text-primary" />
                        <h3 className="text-xl font-semibold">
                            No Properties Found
                        </h3>

                        <p className="text-muted-foreground">
                            Try changing your search or filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                            />
                        ))}
                    </div>
                )
            }        
        </section>
    );
}