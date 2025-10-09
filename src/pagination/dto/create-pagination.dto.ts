export class CreatePaginationDto {
    page: number;
    limit: number;
    searchTerm?: string;
    next?: number;
    previous?: number;
    startDate?: string;
    endDate?: string;
    clientId?: string;
    fullName?: string;
    phone?: string;
    isPaid?: string
    status?:string
    referenceNo:string
}
