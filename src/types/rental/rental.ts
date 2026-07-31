export interface IRentalReq {
    propertyId : string,
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