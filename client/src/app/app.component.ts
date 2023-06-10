import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelegramWebAppService } from './telegram/services/telegram-webapp.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  constructor(
    private telegramWebAppService: TelegramWebAppService,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {
  }

  ngAfterViewChecked() {
    this.telegramWebAppService.initTelegramTheme();
  }

  ngOnInit() {
    console.log('init app ng component')
  }

  onRouteButtonClick(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
