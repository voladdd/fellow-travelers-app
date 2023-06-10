import { StateService } from './utils/state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelegramWebAppService } from './telegram/services/telegram-webapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private telegramWebAppService: TelegramWebAppService, private router: Router, private stateService: StateService) { }

  title = 'client';

  ngOnInit() {
    console.log('init app component')
  }

  onRouteButtonClick(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
