import { Component, OnInit } from '@angular/core';
import { TelegramWebAppService } from './telegram/services/telegram-webapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private telegramWebAppService: TelegramWebAppService) {}

  title = 'client';

  ngOnInit() {
    console.log(this.telegramWebAppService.getInitData());
  }
}
