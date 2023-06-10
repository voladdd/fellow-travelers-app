import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsersProfile } from './types/users';
import { AuthService } from './auth.service';
import { RoadCreationBody, RoadCreationResponse } from './types/roads';

@Injectable({
    providedIn: 'root'
})
export class RoadsService {
    constructor(private authService: AuthService, private httpClient: HttpClient) { }

    async create(roadCreationBody: RoadCreationBody) {
        return await firstValueFrom(this.httpClient.post<RoadCreationResponse>(`${environment.serverHost}/tours/roads`, roadCreationBody, this.authService.httpOptions))
    }
}
