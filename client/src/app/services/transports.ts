import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Transport } from './types/transports';

@Injectable({
    providedIn: 'root'
})
export class TransportsService {
    constructor(private authService: AuthService, private httpClient: HttpClient) { }

    async findAll() {
        return await firstValueFrom(this.httpClient.get<Transport[]>(`${environment.serverHost}/tours/transports`, this.authService.httpOptions))
    }
}
