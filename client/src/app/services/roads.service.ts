import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Road, RoadCreationBody, RoadCreationResponse } from './types/roads';

@Injectable({
    providedIn: 'root'
})
export class RoadsService {
    constructor(private authService: AuthService, private httpClient: HttpClient) { }

    async create(roadCreationBody: RoadCreationBody) {
        return await firstValueFrom(this.httpClient.post<RoadCreationResponse>(`${environment.serverHost}/tours/roads`, roadCreationBody, this.authService.httpOptions))
    }

    async findAll(): Promise<Road[]> {
        return await firstValueFrom(this.httpClient.get<Road[]>(`${environment.serverHost}/tours/roads`, this.authService.httpOptions));
    }
}
