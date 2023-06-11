import { Injectable } from '@angular/core';
import { IWebApp } from './types/webapp';

@Injectable({ providedIn: 'root' })
export class TelegramWebAppService {
  constructor() {
    this.tg.ready();

    this.tg.onEvent('themeChanged', () => {
      this.initTelegramTheme();
    });

    console.log(this.tg); // TODO: remove all console.logs
  }

  tg: IWebApp = (window as any).Telegram.WebApp;

  public initTelegramTheme() {

    const initElementsLikeButton = (elements: any[]) => {
      elements.forEach((element) => {
        document.body.querySelectorAll<HTMLButtonElement>(`${element}`).forEach((element) => {
          element.style.setProperty('background-color', this.tg.themeParams.button_color || '');
          element.style.setProperty('color', this.tg.themeParams.text_color || '');
        })
      })
    }

    initElementsLikeButton(['button', 'select', 'textarea', 'input']);
    document.body.style.setProperty('background-color', this.tg.themeParams.bg_color || '');
    document.body.style.setProperty('color', this.tg.themeParams.text_color || '');

    document.querySelectorAll('a').forEach((element) => {
      element.style.setProperty('color', this.tg.themeParams.link_color || '');
    })
  }

  getInitData() {
    return this.tg.initData;
  }

  alert(title: string, message: string) {
    this.tg.showPopup({ title, message, buttons: [{ text: 'ок' }] })
  }
}
