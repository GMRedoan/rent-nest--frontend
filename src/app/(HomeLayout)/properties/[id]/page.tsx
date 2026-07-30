import { getPropertyById } from "@/server/properties/properties.service";
import { notFound } from "next/navigation";
import PropertyDetails from "../_components/propertyDetails";

interface Props {
    params: {
        id: string;
    };
}

export default async function PropertyPage({
    params,
}: Props) {
    const { id } = await params;
    const result = await getPropertyById(id);
 
    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <PropertyDetails property={result.data} />
    );
}