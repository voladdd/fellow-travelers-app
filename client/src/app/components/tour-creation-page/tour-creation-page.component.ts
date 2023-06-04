import { Component, OnInit } from '@angular/core';
import { TelegramWebAppService } from 'src/app/telegram/services/telegram-webapp.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { forkJoin } from 'rxjs';
import { Place, Transport } from 'src/app/types/types';

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

  constructor(private telegramWebAppService: TelegramWebAppService, private httpClient: HttpClient) { }

  optionsPlaces: SelectedOption[] = [];
  optionsTransports: SelectedOption[] = [];

  selectedOptionDepartureFrom: string = '';
  selectedOptionDepartureTo: string = '';
  selectedOptionMeetingPointLocation: string = '';
  selectedOptionTransport: string = '';

  departureTime: string | undefined;
  departureDate: Date | undefined;
  numberOfPeople: number | undefined;
  meetingPointTime: Date | undefined;
  additionalInfo: string | undefined;

  ngOnInit(): void {
    const headers = {
      'Authorization': `Bearer ${environment.bearerToken}`
    }

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
      this.selectedOptionDepartureFrom = defaultOptionsPlacesValue;
      this.selectedOptionDepartureTo = defaultOptionsPlacesValue;
      this.selectedOptionMeetingPointLocation = defaultOptionsPlacesValue;

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

  onSelectionChangeDepartureFrom(target: any) {
    this.selectedOptionDepartureFrom = target.value;
  }
  onSelectionChangeDepartureTo(target: any) {
    this.selectedOptionDepartureTo = target.value;
  }
  onSelectionChangeMeetingPointLocation(target: any) {
    this.selectedOptionMeetingPointLocation = target.value;
  }
  onSelectionChangeTransport(target: any) {
    this.selectedOptionTransport = target.value;
  }

  onSubmit() {
    // Here you would handle form submission logic
    this.telegramWebAppService.alert('Тур успешно создан',
      `Маршрут тура: ${this.optionsPlaces.find((place) => place.value === this.selectedOptionDepartureFrom)?.label} - ${this.optionsPlaces.find((place) => place.value === this.selectedOptionDepartureTo)?.label}`);
  }
}
