import { getPropertyById } from "@/server/properties/properties.service";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}


export default async function PropertyPage({
    params,
}: Props) {

    const result = await getPropertyById(params.id);


    if (!result.success || !result.data) {
        notFound();
    }


    return (
        <PropertyDetails property={result.data} />
    );
}