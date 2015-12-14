import {App, IonicApp, Platform} from 'ionic/ionic';

import {ForecastPage} from './forecast/forecast';
import {SettingsPage} from './settings/settings';

import "./app.scss";

@App({
  templateUrl: 'app/app.html'
})

class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    this.tab1Root = ForecastPage;
    this.tab2Root = SettingsPage;

    // make home page the Forecast page
    this.rootPage = ForecastPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
     if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }
}