export interface ICreateUser {
    name: string
    email: string
    phone: string
    password: string
    role?: 'TENANT' | 'LANDLORD';
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface Response {
    success: boolean;
    message: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface IUserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePhoto: string | null;
    bio: string | null;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetUserResponse {
    success: boolean;
    message: string;
    data : {profile : IUserProfile}
}

export interface IUpdateProfile {
    name?: string;
    phone?: string;
    bio?: string;
    profilePhoto?: string;
}

export interface IUpdateProfileResponse {
    success: boolean;
    message: string;
    data?: {
        user: IUserProfile;
    };
}

export interface IAllUsersResponse {
    success: boolean;
    message: string;
    data?: {
        users: IUserProfile[];
    };
}

export interface IUpdateUserStatusResponse {
    success: boolean;
    message: string;
    data: {
        user: IUserProfile;
    };
}