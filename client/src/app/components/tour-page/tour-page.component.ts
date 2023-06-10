import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { StatusService } from 'src/app/services/status.service';
import { ToursSerivce } from 'src/app/services/tours.service';
import { TourPopulated } from 'src/app/services/types/tours';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.scss']
})
export class TourPageComponent implements OnInit {
  id: string | undefined;
  tour: TourPopulated | undefined;

  constructor(
    private toursSerivce: ToursSerivce,
    private usersService: UsersService,
    private statusService: StatusService,
    private route: ActivatedRoute,
  ) {
    this.initId();
  }

  async ngOnInit() {
    console.log(this.id);
    await this.initTour();
  }

  async initId() {
    const id = (await firstValueFrom(this.route.paramMap)).get('id');

    if (id) {
      this.id = id;
    }
  }

  // TODO: save last user router path, to open it on the next session
  openExternalTelegramChat(userName: string) {
    window.open(`https://t.me/${userName}`);
  }

  async initTour() {
    if (this.id) {
      this.tour = await this.toursSerivce.findById(this.id);
    }
  }
}
