import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tour, TourCreationBody, TourCreationResponse, TourPopulated, UpdateStatusBody } from "./types/tours";
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

    async kickByUserId(id: string, userId: string) {
        return await firstValueFrom(this.httpClient.post(`${environment.serverHost}/tours/${id}/kick?value=${userId}`, {}, this.authService.httpOptions))
    }

    async join(id: string) {
        return await firstValueFrom(this.httpClient.post(`${environment.serverHost}/tours/${id}/join`, {}, this.authService.httpOptions));
    }

    async leave(id: string) {
        return await firstValueFrom(this.httpClient.post(`${environment.serverHost}/tours/${id}/leave`, {}, this.authService.httpOptions));
    }

    async updateStatusByStatusId(id: string, body: UpdateStatusBody) {
        return await firstValueFrom(this.httpClient.patch(`${environment.serverHost}/tours/${id}/status`, body, this.authService.httpOptions));
    }
}