import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsersProfile } from './types/users';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    // TODO: return observable values, that other can subscribe and getting inited user profile
    public userProfile: UsersProfile | undefined;

    constructor(private authService: AuthService, private httpClient: HttpClient) {
        this.initUserProfile();
    }

    private async initUserProfile() {
        const response = await firstValueFrom(this.httpClient.get<UsersProfile>(`${environment.serverHost}/users/profile`, this.authService.httpOptions));
        this.userProfile = response;
    }
}
