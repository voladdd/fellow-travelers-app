export interface RoadCreationBody {
    placeRoadStart: string;
    placeRoadEnd: string;
    placeMeeting: string;
    timeMeeting: Date;
    timeStart: Date;
    transport: string;
}

export interface RoadCreationResponse {
    placeRoadStart: string;
    placeRoadEnd: string;
    placeMeeting: string;
    timeMeeting: string;
    timeStart: string;
    transport: string;
    _id: string;
}