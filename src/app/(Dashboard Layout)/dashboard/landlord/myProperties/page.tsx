import { getMyProperties } from "@/server/properties/properties.service";
import PropertyManager from "./_components/propertyManager";
import { getCategories } from "@/server/categories/categories.service";

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