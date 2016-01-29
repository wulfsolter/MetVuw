// Angular2 Singleton Pattern by @elecash -  Raúl Jiménez
// http://twofuckingdevelopers.com/2015/04/angular-2-singleton-service/

export class GlobalSettings {

  public forecast: string = '';
  public forecastOffset: number;

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

  setForecast(forecast: string): void {
    localStorage.setItem('forecast', JSON.stringify(forecast));
    this.forecast = forecast;
  }

  getForecast(): Object {
    if (this.forecast) {
      return this.forecast;
    }
    if (localStorage.getItem('forecast')) {
      this.forecast = JSON.parse(localStorage.getItem('forecast'));
      return this.forecast;
    }

    return {label: 'WORLD - World', value: 'rain-world'};
  }

  getOffset(): number {
    return this.forecastOffset;
  }

  setOffset(Offset: string) {
    this.forecastOffset = Offset;
  }
}