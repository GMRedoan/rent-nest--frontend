export interface IProperty {
    id?: string;
    title: string;
    description: string;
    location: string;
    price: number;
    propertyType: "HOUSE" | "APARTMENT" | "ROOM" | "STUDIO" | "COMMERCIAL";
    status?: "AVAILABLE" | "RENTED" | "INACTIVE";
    images: string[];
    categoryId?: string;
    createdAt?: string;
}

export interface GetPropertiesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        properties: IProperty[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
}

export interface GetPropertyResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        properties: IProperty;
    };
}

export interface createPropertyResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        property: IProperty;
    };
}

export interface AddPropertyForm {
    title: string;
    description: string;
    location: string;
    propertyType:
    | "HOUSE"
    | "APARTMENT"
    | "ROOM"
    | "STUDIO"
    | "COMMERCIAL";
    categoryId: string;
    price: number;
    images: FileList;
}

export interface deletePropertyResponse {
    success: boolean;
    statusCode: number;
    message: string;
}