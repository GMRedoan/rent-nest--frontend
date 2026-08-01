export interface ICategory {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetCategoriesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        categories: ICategory[];
    };
}