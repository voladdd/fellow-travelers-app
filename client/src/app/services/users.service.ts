import { environment } from './../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from './types/users';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public userProfile: Observable<User>;

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
        console.log(this.authService.httpOptions);
        const response = await lastValueFrom(this.httpClient.get<User>(`${environment.serverHost}/users/profile`, this.authService.httpOptions));
        return response;
    }
}
