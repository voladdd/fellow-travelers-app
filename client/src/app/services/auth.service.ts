import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelegramWebAppService } from '../telegram/services/telegram-webapp.service';
import { firstValueFrom } from 'rxjs';
import { AuthLoginResponse } from './types/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public initData: string;
    public httpOptions: {
        headers: HttpHeaders;
    };

    constructor(private telegramWebAppService: TelegramWebAppService, private httpClient: HttpClient) {
        this.initData = this.telegramWebAppService.getInitData();
        this.httpOptions = {
            headers: new HttpHeaders({
                'init-data': this.initData,
                'Bypass-Tunnel-Reminder': '0',
            }),
        };

        this.initAccessToken();
    }

    private async initAccessToken() {
        const response = await firstValueFrom(this.httpClient.post<AuthLoginResponse>(`${environment.serverHost}/auth/login`, {}, this.httpOptions));
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${response.access_token}`);
    }
}
