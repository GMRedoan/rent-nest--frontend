import { getProperties } from '@/server/properties/properties.service';
import PropertiesPage from './_components/propertiesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Properties | Rent Nest",
    description: "Browse all available rental properties.",
};


const page = async () => {
    const result = await getProperties();
    const properties = result?.data
     
    return (
        <div className='py-26'>
            <div className="mx-auto mb-14 max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                    Premium Listings
                </p>

                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Find a Place You all Love to Call Home
                </h2>

                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                    Explore handpicked rental properties with transparent pricing,
                    verified landlords, and a seamless booking experience—all in one place.
                </p>
            </div>
            <PropertiesPage
                properties={properties ?? []}
            />
        </div>

    );
};

export default page;