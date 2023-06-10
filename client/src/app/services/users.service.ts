import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { UsersProfile } from './types/users';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public userProfile: Observable<UsersProfile>;

    constructor(private authService: AuthService, private httpClient: HttpClient) {
        this.userProfile = new Observable((observer) => {
            this.getUserProfile().then((v) => {
                console.log(v);
                observer.next(v);
            });
        })

        console.log('init user service');
    }

    private async getUserProfile() {
        const response = await firstValueFrom(this.httpClient.get<UsersProfile>(`${environment.serverHost}/users/profile`, this.authService.httpOptions));
        return response;
    }
}
