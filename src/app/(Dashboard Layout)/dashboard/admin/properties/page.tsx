import PropertiesPage from '@/app/(HomeLayout)/properties/_components/propertiesPage';
import { getProperties } from '@/server/properties/properties.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Properties | Dashboard",
    description: "A property rental app",
};

const page = async () => {
        const result = await getProperties();
        const properties = result?.data
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    All <span className="text-primary">Properties</span>
                </h1>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                    View all registered properties, monitor their status, and manage access
                    across the RentNest platform.
                </p>
            </div>
             <PropertiesPage
                properties={properties ?? []}
            />
        </div>
    );
};

export default page;