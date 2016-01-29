import { App, IonicApp, Platform } from 'ionic-framework/ionic';

import {ForecastPage} from './forecast/forecast';
import {SettingsPage} from './settings/settings';

@App({
  templateUrl: 'build/app.html'
})

class MyApp {

  public app: IonicApp;
  public platform: Platform;
  public tab1Root: any;
  public tab2Root: any;
  public rootPage: any;

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
     // if (typeof StatusBar !== 'undefined') {
     //    StatusBar.styleDefault();
     //  }
    });
  }
}