import { WebApp } from "../types/WebApp.interface";

export function useTelegram() {
  const tg: WebApp = (window as any).Telegram.WebApp;

  tg.MainButton.show();

  tg.MainButton.onClick(() => {
    alert("Yo");
  });

  const onClose = () => {
    tg.close();
  };

  return {
    tg,
    onClose,
  };
}
