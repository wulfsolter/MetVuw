import {Page, NavController} from 'ionic/ionic';
import {GlobalSettings} from '../GlobalSettings';

@Page({
  templateUrl: 'app/rain/rain.html',
  providers: [GlobalSettings],
})

export class RainPage {
  constructor(nav: NavController) {
    this.nav = nav;

    this.pointer = 6;
    if (!this.forecastPath) {
        this.forecastPath = new Date((Math.floor(Date.now()/86400000) * 86400000) - 21600000).toISOString().replace(/[^0-9]+/g, '').substr(0,10);
    }

    this.updateImgPath();

  }

  updateImgPath() {

    var padding = function(val) {
      if (val < 100) {
        return ('00' + val).substr(-2);
      } else {
        return ('000' + val).substr(-3);
      }
    };

    var region = GlobalSettings.getInstance().getRegion();
    // console.log(this.gSet);

    this.imgPath = this.forecastPath + '/rain-' + region + '-' + this.forecastPath + '-' + padding(this.pointer) + '.gif';
    this.imgPrefetch1 = this.forecastPath + '/rain-' + region + '-' + this.forecastPath + '-' + padding(this.pointer + 6) + '.gif';
    this.imgPrefetch2 = this.forecastPath + '/rain-' + region + '-' + this.forecastPath + '-' + padding(this.pointer + 12) + '.gif';
  }

  next() {
    if (this.pointer >= 240) {
      // only a 10 day (240hour) forceast
      return;
    }
    this.pointer += 6;
    this.updateImgPath();
  }

  prev() {
    if (this.pointer <= 6) {
      // no point in going back in time
      return;
    }
    this.pointer -= 6;
    this.updateImgPath();
  }

  autoPlay() {

  }
}
