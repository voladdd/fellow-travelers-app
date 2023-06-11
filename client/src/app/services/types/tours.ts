import { Road } from "./roads";
import { Status } from "./status";
import { User } from "./users";

export interface TourCreationBody {
    description: string;
    maxPeopleCount: number;
    author: string;
    road: string;
}

export interface TourCreationResponse {
    _id: string;
    description: string;
    maxPeopleCount: number;
    author: string;
    road: string;
}

interface TourAbstract {
    _id: string;
    maxPeopleCount: number;
    description: string;
    author: unknown;
    participants: unknown[];
    road: unknown;
    status: unknown;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tour extends TourAbstract {
    author: string;
    participants: string[];
    road: string;
    status: string;
}

export interface TourPopulated extends TourAbstract {
    author: User;
    participants: User[];
    road: Road;
    status: Status;
}

export interface UpdateStatusBody {
    status: string;
}