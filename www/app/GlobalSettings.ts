// Angular2 Singleton Pattern by @elecash -  Raúl Jiménez
// http://twofuckingdevelopers.com/2015/04/angular-2-singleton-service/

export class GlobalSettings {
  forecast: string = 'rain-nzsi';
  static instance:GlobalSettings;
  static isCreating:Boolean = false;

  constructor() {
    if (!GlobalSettings.isCreating) {
      throw new Error("You can't call new in GlobalSettings Singleton instances!");
    }
  }

  static getInstance() {
    if (GlobalSettings.instance == null) {
      GlobalSettings.isCreating = true;
      GlobalSettings.instance = new GlobalSettings();
      GlobalSettings.isCreating = false;
    }

    return GlobalSettings.instance;
  }

  setForecast(forecast:String) {
      this.forecast = forecast;
      console.log('forecast set to:' + forecast);
  }

  getForecast() {
      return this.forecast;
  }

}