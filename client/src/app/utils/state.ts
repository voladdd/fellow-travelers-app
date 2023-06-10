import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersProfile } from '../types/http/get';
import { AuthLoginResponse } from '../types/http/post';
import { TelegramWebAppService } from '../telegram/services/telegram-webapp.service';
import { Observable, catchError, delay, firstValueFrom, of, retry, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    public initData: string;
    public userProfile: UsersProfile | undefined;
    public access_token: string | undefined;
    public httpOptions: {
        headers: HttpHeaders;
    };

    constructor(private telegramWebAppService: TelegramWebAppService, private httpClient: HttpClient) {
        console.log('init state service')
        this.initData = this.telegramWebAppService.getInitData();
        this.httpOptions = {
            headers: new HttpHeaders({
                'init-data': this.initData,
                'Bypass-Tunnel-Reminder': '0',
            }),
        };

        this.initValues();
    }

    async getAccessToken() {
        const response = await firstValueFrom(this.httpClient.post<AuthLoginResponse>(`${environment.serverHost}/auth/login`, {}, this.httpOptions));
        return response.access_token;
    }

    async getUserProfile() {
        const response = await firstValueFrom(this.httpClient.get<UsersProfile>(`${environment.serverHost}/users/profile`, this.httpOptions));
        return response;
    }

    async initValues() {
        this.access_token = await this.getAccessToken();
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.access_token}`);
        console.log(this.httpOptions)
        this.userProfile = await this.getUserProfile();
    }
}
