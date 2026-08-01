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