import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { headers } from './constants';
import { UsersProfile } from '../types/http/get';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    public userProfile: UsersProfile | undefined;

    constructor(private httpClient: HttpClient) {
        this.initUserProfile();
    }

    initUserProfile() {
        this.httpClient.get<UsersProfile>(`http://${environment.serverHost}/users/profile`, { headers }).subscribe({
            next: ((data) => {
                this.userProfile = data;
            })
        })
    }
}
