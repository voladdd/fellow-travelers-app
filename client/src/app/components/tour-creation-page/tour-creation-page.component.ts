import { StateService } from './../../utils/state';
import { Component, OnInit } from '@angular/core';
import { TelegramWebAppService } from '../../../app/telegram/services/telegram-webapp.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { forkJoin } from 'rxjs';
import { Place, Transport } from '../../../app/types/types';
import { headers } from '../../../app/utils/constants';
import { getDateObjectByDateTime } from '../../../app/utils/functions';
import { RoadCreationBody, RoadCreationResponse, TourCreationBody, TourCreationResponse } from '../../../app/types/http/post';

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
    private httpClient: HttpClient,
    private stateService: StateService,
  ) { }

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

  ngOnInit(): void {
    // Load data
    const places = this.httpClient.get<Place[]>(`http://${environment.serverHost}/tours/places`, { headers })
    const transports = this.httpClient.get<Transport[]>(`http://${environment.serverHost}/tours/transports`, { headers })

    forkJoin([places, transports]).subscribe(response => {
      // Set Places initial options
      response[0].forEach((place) => {
        this.optionsPlaces.push({
          value: place._id,
          label: place.address
        })
      })
      const defaultOptionsPlacesValue = this.optionsPlaces[0].value;
      this.selectedOptionRoadStart = defaultOptionsPlacesValue;
      this.selectedOptionRoadEnd = defaultOptionsPlacesValue;
      this.selectedOptionPlaceMeeting = defaultOptionsPlacesValue;

      // Set Transports initial options
      response[1].forEach((transport) => {
        this.optionsTransports.push({
          value: transport._id,
          label: transport.name
        })
      })
      this.selectedOptionTransport = this.optionsTransports[0].value;
    })
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

  onSubmit() {
    // Create road
    const timeStart = getDateObjectByDateTime(this.roadStartDate, this.roadStartTime);
    const timeMeeting = getDateObjectByDateTime(this.roadStartDate, this.placeMeetingTime);

    const roadCreationBody: RoadCreationBody = {
      placeRoadStart: this.selectedOptionRoadStart,
      placeRoadEnd: this.selectedOptionRoadEnd,
      placeMeeting: this.selectedOptionPlaceMeeting,
      timeMeeting,
      timeStart,
      transport: this.selectedOptionTransport
    }

    this.httpClient.post<RoadCreationResponse>(`http://${environment.serverHost}/tours/roads`, roadCreationBody, { headers }).subscribe({
      next: (roadCreationResponse) => {
        // Create tour
        const tourCreationBody: TourCreationBody = {
          description: this.description,
          maxPeopleCount: Number(this.maxPeopleCount),
          author: this.stateService.userProfile!._id,
          road: roadCreationResponse._id
        }

        this.httpClient.post<TourCreationResponse>(`http://${environment.serverHost}/tours`, tourCreationBody, { headers }).subscribe({
          next: () => {
            this.telegramWebAppService.alert('Поездка успешно создана',
              `Маршрут: ${this.optionsPlaces.find((place) => place.value === this.selectedOptionRoadStart)?.label} - ${this.optionsPlaces.find((place) => place.value === this.selectedOptionRoadEnd)?.label}`
            );
          },
          error: (error: any) => {
            this.telegramWebAppService.alert(error.error, `${error.message}`)
          }
        })
      },
      error: (error: any) => {
        this.telegramWebAppService.alert(error.error, `${error.message}`)
      }
    })
  }
}
