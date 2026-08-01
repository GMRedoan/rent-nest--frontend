export interface ICreateReviewPayload {
    propertyId: string;
    comment: string;
}

export interface IReview {
    id: string;
    comment: string;
    propertyId: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateReviewResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        review: IReview;
    };
};

export interface ILandlordReview {

    id: string;
    comment: string;
    propertyId: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
    property: {
        id: string;
        title: string;
        description: string;
        propertyType:
        | "HOUSE"
        | "APARTMENT"
        | "ROOM"
        | "STUDIO"
        | "COMMERCIAL";
        price: number;
        location: string;
        images: string[];
        status:
        | "AVAILABLE"
        | "RENTED"
        | "INACTIVE";
    };

}

export type GetPropertyReviewsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        reviews: ILandlordReview[];
    };
};