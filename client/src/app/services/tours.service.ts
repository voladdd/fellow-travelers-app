import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tour, TourCreationBody, TourCreationResponse, TourPopulated } from "./types/tours";
import { AuthService } from "./auth.service";
import { environment } from "src/environment/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ToursSerivce {
    constructor(private authService: AuthService, private httpClient: HttpClient) { }

    async create(tourCreationBody: TourCreationBody) {
        return await firstValueFrom(this.httpClient.post<TourCreationResponse>(`${environment.serverHost}/tours`, tourCreationBody, this.authService.httpOptions))
    }

    async findAll(): Promise<Tour[]> {
        return await firstValueFrom(this.httpClient.get<Tour[]>(`${environment.serverHost}/tours`, this.authService.httpOptions));
    }

    async findById(id: string): Promise<TourPopulated> {
        return await firstValueFrom(this.httpClient.get<TourPopulated>(`${environment.serverHost}/tours/${id}`, this.authService.httpOptions));
    }
}