import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelegramWebAppService } from './telegram-webapp.service';
import { firstValueFrom } from 'rxjs';
import { AuthLoginResponse } from './types/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public initData: string;
    public httpOptions: {
        headers: {
            'init-data': string;
            'Bypass-Tunnel-Reminder': string;
            'Authorization'?: string;
        };
    };

    constructor(private telegramWebAppService: TelegramWebAppService, private httpClient: HttpClient) {
        this.initData = this.telegramWebAppService.getInitData();
        this.httpOptions = {
            headers: {
                'init-data': this.initData,
                'Bypass-Tunnel-Reminder': '0',
            },
        };
        console.log('init auth service');

        this.initAccessToken();
    }

    private async initAccessToken() {
        const response = await firstValueFrom(this.httpClient.post<AuthLoginResponse>(`${environment.serverHost}/auth/login`, {}, this.httpOptions));
        console.log(response.access_token);
        this.httpOptions.headers.Authorization = `Bearer ${response.access_token}`;
        console.log(this.httpOptions.headers);
    }
}
