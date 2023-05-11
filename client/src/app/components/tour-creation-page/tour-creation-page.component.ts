import { Component } from '@angular/core';

@Component({
  selector: 'app-tour-creation-page',
  templateUrl: './tour-creation-page.component.html',
  styleUrls: ['./tour-creation-page.component.scss']
})
export class TourCreationPageComponent {
  departureFrom: string | undefined;
  departureTo: string | undefined;
  departureTime: string | undefined;
  departureDate: string | undefined;
  numberOfPeople: number | undefined;
  meetingPointLocation: string | undefined;
  meetingPointTime: string | undefined;
  additionalInfo: string | undefined;

  onSubmit() {
    // Here you would handle form submission logic
    console.log('Tour created!');
  }
}
