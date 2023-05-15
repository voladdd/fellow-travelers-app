import { Component } from '@angular/core';
import { TelegramWebAppService } from 'src/app/telegram/services/telegram-webapp.service';

@Component({
  selector: 'app-tour-creation-page',
  templateUrl: './tour-creation-page.component.html',
  styleUrls: ['./tour-creation-page.component.scss']
})
export class TourCreationPageComponent {

  constructor(private telegramWebAppService: TelegramWebAppService) { }

  departureFrom: string | undefined;
  departureTo: string | undefined;
  departureTime: string | undefined;
  departureDate: Date | undefined;
  numberOfPeople: number | undefined;
  meetingPointLocation: string | undefined;
  meetingPointTime: Date | undefined;
  additionalInfo: string | undefined;

  onSubmit() {
    // Here you would handle form submission logic
    // console.log('Tour created!');
    this.telegramWebAppService.alert('Тур успешно создан',
      `
    * Отправление *
    Откуда: ${this.departureFrom},
    Куда: ${this.departureTo},
    Кол-во людей: ${this.numberOfPeople},
    Когда: ${this.departureDate},
    Во сколько: ${this.departureTime}.
    
    * Сбор *
    Где: ${this.meetingPointLocation},
    Во сколько: ${this.meetingPointTime}.

    * Доп. информация *
    Комментарий: ${this.additionalInfo}.
    `);
  }
}
