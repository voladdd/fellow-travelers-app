import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TourCreationBody, TourCreationResponse } from "./types/tours";
import { AuthService } from "./auth.service";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class ToursSerivce {
    constructor(private authService: AuthService, private httpClient: HttpClient) { }

    async create(tourCreationBody: TourCreationBody) {
        return this.httpClient.post<TourCreationResponse>(`${environment.serverHost}/tours`, tourCreationBody, this.authService.httpOptions)
    }

    // async findAll(): Promise<Tour[]> {
    //     return
    // }
}