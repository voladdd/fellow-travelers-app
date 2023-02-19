export interface WebApp {
  /**A string with raw data transferred to the Web App, convenient for validating data.
  WARNING: Validate data from this field before using it on the bot's server. */
  initData: string;
  /**A method that informs the Telegram app that the Web App is ready to be displayed.
  It is recommended to call this method as early as possible, as soon as all essential interface elements are loaded. Once this method is called, the loading placeholder is hidden and the Web App is shown.
  If the method is not called, the placeholder will be hidden only when the page is fully loaded. */
  ready(): () => {};
  /**	A method that closes the Web App. */
  close(): () => {};
  /**An object for controlling the main button, which is displayed at the bottom of the Web App in the Telegram interface. */
  MainButton: MainButton;
}
export interface MainButton {
  /**A method that sets the button press event handler. An alias for Telegram.WebApp.onEvent('mainButtonClicked', callback) */
  onClick: (callback: any) => {};
  /**A method to make the button visible.
  Note that opening the Web App from the attachment menu hides the main button until the user interacts with the Web App interface. */
  show: () => {};
}
