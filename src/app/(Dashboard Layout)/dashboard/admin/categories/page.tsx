import { getCategories } from '@/server/categories/categories.service';
import CategoryTable from './_components/CategoryTable';
import AddCategoryButton from './_components/AddCategoryButton';

const page = async  () => {
    const result = await getCategories();
    const categories = result?.data;

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight">
                        Property <span className="text-primary"> Categories</span>
                    </h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Manage all property categories available on the RentNest platform.
                        Add new categories, edit existing ones, or remove unused categories.
                    </p>
                </div>

                <AddCategoryButton />
            </div>
            <CategoryTable categories={categories ?? []} />
        </div>
    );
};

export default page;