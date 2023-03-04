import { IWebApp } from "../types/WebApp.interface";

export const tg: IWebApp = (window as any).Telegram.WebApp;

export function useTelegram() {
  tg.MainButton.show();

  const onClose = () => {
    tg.showPopup({ message: "Hey", buttons: [{ text: "TextText" }] });
  };

  return {
    tg,
    onClose,
  };
}
