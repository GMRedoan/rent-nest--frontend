import { getMyProperties } from "@/server/properties/properties.service";
import PropertyManager from "./_components/propertyManager";
import { getCategories } from "@/server/categories/categories.service";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Properties | Rent Nest",
    description: "A property rental app",
};

export default async function MyPropertiesPage() {
    const result = await getMyProperties();
    const categories = await getCategories();

    return (
        <PropertyManager
            properties={result.data ?? []}
            categories={categories.data ?? []}
        />
    );
}