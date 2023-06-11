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

export interface Road {
    _id: string;
    placeRoadStart: {
        _id: string;
        name: string;
        address: string;
    };
    placeRoadEnd: {
        _id: string;
        name: string;
        address: string;
    };
    placeMeeting: {
        _id: string;
        name: string;
        address: string;
    };
    timeMeeting: string;
    timeStart: string;
    transport: {
        _id: string;
        name: string;
        description: string;
    };
}
