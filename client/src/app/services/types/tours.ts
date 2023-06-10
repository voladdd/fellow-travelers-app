export interface TourCreationBody {
    description: string;
    maxPeopleCount: number;
    author: string;
    road: string;
}

export interface TourCreationResponse {
    description: string;
    maxPeopleCount: number;
    author: string;
    road: string;
}

export interface Tour {
    _id: string;
    maxPeopleCount: number;
    description: string;
    author: string;
    participants: string[];
    road: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}