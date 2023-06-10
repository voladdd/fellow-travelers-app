import { ToursSerivce } from './../../services/tours.service';
import { Component, OnInit } from '@angular/core';
import { TelegramWebAppService } from '../../../app/telegram/services/telegram-webapp.service';
import { getDateObjectByDateTime } from '../../../app/utils/functions';
import { UsersService } from 'src/app/services/users.service';
import { RoadsService } from 'src/app/services/roads.service';
import { TransportsService } from 'src/app/services/transports';
import { PlacesService } from 'src/app/services/places.service';
import { UsersProfile } from 'src/app/services/types/users';

interface SelectedOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-tour-creation-page',
  templateUrl: './tour-creation-page.component.html',
  styleUrls: ['./tour-creation-page.component.scss']
})
export class TourCreationPageComponent implements OnInit {
  constructor(
    private telegramWebAppService: TelegramWebAppService,
    private usersService: UsersService,
    private toursSerivce: ToursSerivce,
    private roadsService: RoadsService,
    private transportsService: TransportsService,
    private placesService: PlacesService,
  ) {
    console.log('tours creation component inited')
    this.usersService.userProfile.subscribe((v) => {
      console.log(v);
      this.userProfile = v;
    })
  }

  userProfile: UsersProfile | undefined;

  optionsPlaces: SelectedOption[] = [];
  optionsTransports: SelectedOption[] = [];

  selectedOptionRoadStart: string = '';
  selectedOptionRoadEnd: string = '';
  selectedOptionPlaceMeeting: string = '';
  selectedOptionTransport: string = '';

  roadStartTime: string = '';
  roadStartDate: string = '';
  maxPeopleCount: string = '';
  placeMeetingTime: string = '';
  description: string = '';

  async ngOnInit() {
    // Load data
    console.log('init creation page')
    const places = await this.placesService.findAll();
    const transports = await this.transportsService.findAll();

    places.forEach((place) => {
      this.optionsPlaces.push({
        value: place._id,
        label: place.address
      })

      const defaultOptionsPlacesValue = this.optionsPlaces[0].value;
      this.selectedOptionRoadStart = defaultOptionsPlacesValue;
      this.selectedOptionRoadEnd = defaultOptionsPlacesValue;
      this.selectedOptionPlaceMeeting = defaultOptionsPlacesValue;
    })

    transports.forEach((transport) => {
      this.optionsTransports.push({
        value: transport._id,
        label: transport.name
      })
    })
    this.selectedOptionTransport = this.optionsTransports[0].value;
  }

  onSelectionChangeRoadStart(target: any) {
    this.selectedOptionRoadStart = target.value;
  }
  onSelectionChangeRoadEnd(target: any) {
    this.selectedOptionRoadEnd = target.value;
  }
  onSelectionChangePlaceMeeting(target: any) {
    this.selectedOptionPlaceMeeting = target.value;
  }
  onSelectionChangeTransport(target: any) {
    this.selectedOptionTransport = target.value;
  }

  async onSubmit() {
    // Create road
    const timeStart = getDateObjectByDateTime(this.roadStartDate, this.roadStartTime);
    const timeMeeting = getDateObjectByDateTime(this.roadStartDate, this.placeMeetingTime);

    try {
      const road = await this.roadsService.create({
        placeRoadStart: this.selectedOptionRoadStart,
        placeRoadEnd: this.selectedOptionRoadEnd,
        placeMeeting: this.selectedOptionPlaceMeeting,
        timeMeeting,
        timeStart,
        transport: this.selectedOptionTransport
      });

      if (this.userProfile) {
        const tour = await this.toursSerivce.create({
          description: this.description,
          maxPeopleCount: Number(this.maxPeopleCount),
          author: this.userProfile._id,
          road: road._id
        });

        this.telegramWebAppService.alert('Поездка успешно создана',
          `Маршрут: ${this.optionsPlaces.find((place) => place.value === this.selectedOptionRoadStart)?.label} - ${this.optionsPlaces.find((place) => place.value === this.selectedOptionRoadEnd)?.label}`
        );

        // TODO: navigate to tour page

      }
    } catch (error: any) {
      this.telegramWebAppService.alert(error.error, `${error.message}`)
    }
  }
}
