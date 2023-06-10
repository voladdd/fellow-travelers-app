import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Status } from './types/status';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    constructor(private authService: AuthService, private httpClient: HttpClient) { }

    async findAll(): Promise<Status[]> {
        return await firstValueFrom(this.httpClient.get<Status[]>(`${environment.serverHost}/tours/status`, this.authService.httpOptions));
    }
}
