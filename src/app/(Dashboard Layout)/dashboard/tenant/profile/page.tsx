import { getUser } from '@/server/user/user.service';
import React from 'react';
import ProfileCard from './_components/ProfileCard';
import { IUserProfile } from '@/types/auth/auth';

const page = async () => {
    const res = await getUser();
    const user = res.data;
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

            <ProfileCard user={user as IUserProfile} />
        </div>
    );
};

export default page;