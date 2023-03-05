//Interface for window.Telegram.WebApp

export interface IWebApp {
    /**
     * A string with raw data transferred to the Web App, convenient for validating data.
    WARNING: Validate data from this field before using it on the bot's server. 
    */
    readonly initData: string;
    /** 
     * An object with input data transferred to the Web App.
    WARNING: Data from this field should not be trusted. You should only use data from initData on the bot's server and only after it has been validated. 
    */
    readonly initDataUnsafe: IWebAppInitData;
    /**
     * A method that informs the Telegram app that the Web App is ready to be displayed.
    It is recommended to call this method as early as possible, as soon as all essential interface elements are loaded. Once this method is called, the loading placeholder is hidden and the Web App is shown.
    If the method is not called, the placeholder will be hidden only when the page is fully loaded. 
    */
    ready(): void;
    /**
     * A method that closes the Web App.
     * */
    close(): void;
    showPopup(params: IPopupParams, callback?: () => {}): () => {};
    MainButton: IMainButton;
    PopupParams: IPopupParams;
  }
  
  /**
   * An object for controlling the main button, which is displayed at the bottom of the Web App in the Telegram interface.
   * */
  export interface IMainButton {
    /**
     * A method that sets the button press event handler. An alias for Telegram.WebApp.onEvent('mainButtonClicked', callback)
     * */
    onClick(event: string, callback?: () => {}): void;
    /**
     * A method to make the button visible.
    Note that opening the Web App from the attachment menu hides the main button until the user interacts with the Web App interface. 
    */
    show(): void;
  }
  
  export interface IWebAppInitData {}
  
  /**
   * This object describes the native popup.
   * */
  export interface IPopupParams {
    /**
     * Optional. The text to be displayed in the popup title, 0-64 characters.
     */
    title?: string;
    /**
     * 	The message to be displayed in the body of the popup, 1-256 characters.
     */
    message: string;
    /**
     * Optional. List of buttons to be displayed in the popup, 1-3 buttons. Set to [{“type”:“close”}] by default.
     */
    buttons: IPopupButton[];
  }
  
  /**
   * This object describes the native popup button.
   */
  export interface IPopupButton {
    /**
     * Optional. Identifier of the button, 0-64 characters. Set to empty string by default.
      If the button is pressed, its id is returned in the callback and the popupClosed event.
     */
    id?: string;
    /**
     * Optional. Type of the button. Set to default by default.
  Can be one of these values:
  - default, a button with the default style,
  - ok, a button with the localized text “OK”,
  - close, a button with the localized text “Close”,
  - cancel, a button with the localized text “Cancel”,
  - destructive, a button with a style that indicates a destructive action (e.g. “Remove”, “Delete”, etc.).
     */
    type?: string;
    /**
     * Optional. The text to be displayed on the button, 0-64 characters. Required if type is default or destructive. Irrelevant for other types.
     */
    text?: string;
  }