import { allUsers } from '@/server/user/user.service';
import AdminUsersTable from './_components/AdminUsersTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Users | Dashboard",
    description: "A property rental app",
};


const page = async () => {
    const result = await allUsers();
    return (
        <div>
            <div className="mb-8">
                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    Manage Platform <span className="text-primary">Users</span>
                </h1>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                    View all registered users, monitor their account status, and manage access
                    across the RentNest platform. Keep your community secure by activating or
                    banning accounts when necessary.
                </p>
            </div>
            <AdminUsersTable users={result.data ?? []} />
        </div>
    );
};

export default page;