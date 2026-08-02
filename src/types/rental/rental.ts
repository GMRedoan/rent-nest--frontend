export interface IRentalReq {
    propertyId?: string,
    message? : string,
    startDate : Date,
    endDate : Date
}

export interface CreateRentalRequestResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        rentalRequest: IRentalReq;
    };
}

export interface IMyRentalHistory {
    id: string;
    message: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    startDate: string;
    endDate: string | null;
    createdAt?: string;
    property: {
        id: string;
        title: string;
        status?: "AVAILABLE" | "RENTED" | "UNAVAILABLE";
        images: string[];
        propertyType: string;
        location: string;
        price: number;
    };
    payment: {
        id: string;
        amount: number;
        status: "PENDING" | "PAID" | "FAILED";
    } | null;
    tenant?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface myRentalReqRes {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        rentalRequests: IMyRentalHistory[];
    };
}

export interface UpdateRentalReqStatusResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        rentalRequest: IMyRentalHistory;
    };
}