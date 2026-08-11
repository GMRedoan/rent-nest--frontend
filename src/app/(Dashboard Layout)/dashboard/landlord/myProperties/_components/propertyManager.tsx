"use client";

import { useState } from "react";
import PropertyManagementCard from "./PropertyManagementCard";
import { Button } from "@/components/ui/button";
import { IProperty } from "@/types/property/property";
import { MdAdd } from "react-icons/md";
import AddPropertyModal from "./AddPropertyModal";
import { ICategory } from "@/types/category/category";
import EditPropertyModal from "./EditPropertyModal";
import DeletePropertyModal from "./DeletePropertyModal";
import { FileX } from "lucide-react";

interface Props {
    properties: IProperty[];
    categories: ICategory[];
}

export default function PropertyManager({
    properties,
    categories,
}: Props) {

    const [selectedProperty, setSelectedProperty] =
        useState<IProperty | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            {properties.length === 0 ?
                (<div className="flex flex-col items-center py-20">
                    <FileX className="mb-4 h-14 w-14 text-muted-foreground" />

                    <h3 className="text-xl font-semibold">
                        No Property Found
                    </h3>

                    <p className="mt-2 text-muted-foreground mb-8">
                        Please add a property.
                    </p>
                    <Button onClick={() => setAddOpen(true)}>
                        Add Property <MdAdd />
                    </Button>
                </div>
                ) 
                :
                (
                    <>
                        < div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    My <span className="text-primary">Properties</span>
                                </h1>
                                <p className="text-muted-foreground">
                                    Manage all your rental properties.
                                </p>
                            </div>
                            <Button onClick={() => setAddOpen(true)}>
                                Add Property <MdAdd />
                            </Button>
                        </div >
                        {/* Grid */}
                        < div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" >
                            {
                                properties.map((property) => (
                                    <PropertyManagementCard
                                        key={property.id}
                                        property={property}
                                        onEdit={(property) => {
                                            setSelectedProperty(property);
                                            setEditOpen(true);
                                        }}
                                        onDelete={(property) => {
                                            setSelectedProperty(property);
                                            setDeleteOpen(true);
                                        }}
                                    />
                                ))
                            }
                        </div >

                    </>
                )
            }
            {/* Modals */}

            < AddPropertyModal
                open={addOpen}
                onOpenChange={setAddOpen}
                categories={categories}
            />

            {selectedProperty && (
                <>
                    <EditPropertyModal
                        key={selectedProperty.id}
                        open={editOpen}
                        onOpenChange={setEditOpen}
                        property={selectedProperty}
                        categories={categories}
                    />

                    <DeletePropertyModal
                        open={deleteOpen}
                        onOpenChange={setDeleteOpen}
                        propertyId={selectedProperty.id}
                        propertyTitle={selectedProperty.title}
                    />
                </>
            )}
        </>
    );
}