import { Road } from "src/app/services/types/roads";

export interface ToursPageListItem {
    maxPeopleCount: string;
    description: string;
    participants: string;
    road: Road;
    status: string;
}