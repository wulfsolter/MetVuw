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

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }
}