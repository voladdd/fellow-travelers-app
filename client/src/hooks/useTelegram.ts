import { IWebApp } from "../types/WebApp.interface";

export function useTelegram() {
  const tg: IWebApp = (window as any).Telegram.WebApp;

  tg.MainButton.show();

  const onClose = () => {
    tg.showPopup({ message: "Hey", buttons: [{ text: "TextText" }] });

    // tg.close();
  };

  return {
    tg,
    onClose,
  };
}
