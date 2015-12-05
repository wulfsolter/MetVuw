// Angular2 Singleton Pattern by @elecash -  Raúl Jiménez
// http://twofuckingdevelopers.com/2015/04/angular-2-singleton-service/

import {LocalStorage} from 'ionic/ionic';

export class GlobalSettings {
  forecast: string = '';
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
    window.localStorage.setItem('forecast', forecast);
    this.forecast = forecast;
    console.log('forecast sssset to:' + forecast);
  }

  getForecast() {
    if (this.forecast) {
      return this.forecast;
    }
    if (window.localStorage.getItem('forecast')) {
      this.forecast = window.localStorage.getItem('forecast');
      return this.forecast;
    }

    return 'rain-world';
  }
}