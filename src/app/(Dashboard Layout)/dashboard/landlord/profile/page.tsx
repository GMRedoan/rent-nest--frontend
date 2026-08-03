import { Metadata } from 'next';
import ProfileCard from '../../tenant/profile/_components/ProfileCard';

export const metadata: Metadata = {
    title: "Profile | Rent Nest",
    description: "A property rental app",
};

const page = async () => {
    return (
        <div>
            <div className="mb-12">
                <h1 className="text-3xl font-bold">
                    Welcome to your <span className="text-primary">Profile</span>
                </h1>

                <p className="mt-2 text-muted-foreground">
                    View and manage your profile information.
                </p>
            </div>

            <ProfileCard/>
        </div>
    );
};

export default page;