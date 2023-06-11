import { throwError } from 'rxjs';
import { ToursSerivce } from './../../services/tours.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/types/users';
import { UsersService } from 'src/app/services/users.service';
import { RoadsService } from 'src/app/services/roads.service';
import { ToursPageListItem } from './types';
import { StatusService } from 'src/app/services/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tours-page',
  templateUrl: './tours-page.component.html',
  styleUrls: ['./tours-page.component.scss']
})
export class ToursPageComponent implements OnInit {

  tours: ToursPageListItem[] | undefined;
  userProfile: User | undefined;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private roadsService: RoadsService,
    private statusService: StatusService,
    private toursSerivce: ToursSerivce,
  ) {
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
      const tours = await this.toursSerivce.findAll();
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
      }).filter((tour) => tour.status === 'Открыт')
    } catch (error) {
      throwError(() => {
        return new Error('Error trying to getTours' + error);
      })
    }
  }
}
