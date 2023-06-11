import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Place } from './types/places';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    constructor(private authService: AuthService, private httpClient: HttpClient) { }

    async findAll() {
        return await firstValueFrom(this.httpClient.get<Place[]>(`${environment.serverHost}/tours/places`, this.authService.httpOptions))
    }
}
