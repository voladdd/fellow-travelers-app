import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoadsService } from 'src/app/services/roads.service';
import { StatusService } from 'src/app/services/status.service';
import { User } from 'src/app/services/types/users';
import { UsersService } from 'src/app/services/users.service';
import { ToursPageListItem } from '../tours-page/types';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-my-tours-page',
    templateUrl: './my-tours-page.component.html',
    styleUrls: ['./my-tours-page.component.scss']
})
export class MyToursPageComponent {
    tours: ToursPageListItem[] | undefined;
    userProfile: User | undefined;

    constructor(
        private router: Router,
        private usersService: UsersService,
        private roadsService: RoadsService,
        private statusService: StatusService,
    ) {
        console.log('my-tours-page component inited')
    }

    async ngOnInit() {
        this.usersService.userProfile.subscribe(async (v) => {
            this.userProfile = v;
            await this.getTours();
        })
    }

    onTourOpenClick(id: string) {
        this.router.navigate([`tours`, id]);
    }

    async getTours() {
        console.log('user profile' + this.userProfile);
        try {
            const tours = await this.usersService.findAllTours();
            const roads = await this.roadsService.findAll();
            const status = await this.statusService.findAll();

            this.tours = tours.map<ToursPageListItem>((tour) => {
                const road = roads.find((road) => road._id === tour.road);
                return {
                    id: tour._id,
                    maxPeopleCount: tour.maxPeopleCount.toString(),
                    description: tour.description,
                    participants: tour.participants.length.toString(),
                    road: road!, // TODO: check if its not undefined
                    status: `${status.find((status) => status._id === tour.status)?.name}`,
                }
            })
        } catch (error) {
            throwError(() => {
                return new Error('Error trying to getTours' + error);
            })
        }
    }
}
