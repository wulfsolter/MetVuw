import {Page, NavController} from 'ionic/ionic';
import {GlobalSettings} from '../GlobalSettings';

@Page({
  templateUrl: 'app/rain/rain.html',
  providers: [GlobalSettings],
})

export class RainPage {
  constructor(nav: NavController) {
    this.nav = nav;
    this.playing = false;

    // Time between now and when the forecast was rendered
    this.nowPointerOffset =  Math.floor((Date.now() - ((Math.floor(Date.now()/86400000) * 86400000) - 21600000))/3600000);

    // get latest rendered forecast in Zulu (rendered at 7am NZDT)
    this.forecastPath = new Date((Math.floor(Date.now()/86400000) * 86400000) - 21600000).toISOString().replace(/[^0-9]+/g, '').substr(0,10);

    // usually we will be ahead of the forecast, but by how much
    this.pointerMinimum = Math.ceil(this.nowPointerOffset/6) * 6 || 6;

    // in the constructor so set pointer to minimum
    this.pointer = this.pointerMinimum;

    this.updateImgPath();

    // console.log(this.nowPointerOffset);

  }

  updateImgPath() {

    var padding = function(val) {
      if (val > 240) {
        return padding(val - 240);
      } else if (val < 100) {
        return ('00' + val).substr(-2);
      } else {
        return ('000' + val).substr(-3);
      }
    };

    var region = GlobalSettings.getInstance().getRegion();
    // console.log(this.gSet);

    this.imgPath      = this.forecastPath + '/rain-' + region + '-' + this.forecastPath + '-' + padding(this.pointer) + '.gif';
    this.imgPrefetch1 = this.forecastPath + '/rain-' + region + '-' + this.forecastPath + '-' + padding(this.pointer + 6) + '.gif';
    this.imgPrefetch2 = this.forecastPath + '/rain-' + region + '-' + this.forecastPath + '-' + padding(this.pointer + 12) + '.gif';
    this.imgPrefetch3 = this.forecastPath + '/rain-' + region + '-' + this.forecastPath + '-' + padding(this.pointer + 18) + '.gif';
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
    if (this.pointer <= this.pointerMinimum) {
      // no point in going back in time
      return;
    }
    this.pointer -= 6;
    this.updateImgPath();
  }

  loopingNext() {
    if (this.pointer >= 240) {
      this.pointer = this.pointerMinimum;
    } else {
      this.pointer += 6;
    }

    if (this.playing) {

      var timeStart = Date.now();
      console.log('this.playing');

      var image = new Image();
      image.onload = () => {
        var timeLength = Date.now() - timeStart;
        if (timeLength < 250) {
          setTimeout(() => {
            console.log('waited ' + (250 - timeLength));
            this.updateImgPath();
            setTimeout(() => {
              this.loopingNext();
            }, 250);
          }, (250 - timeLength));
        } else {
          this.updateImgPath();
          console.log('took ' + timeLength + ' to load image');
          setTimeout(() => {
            this.loopingNext();
          }, 250);
        }
      }
      image.onerror = function () {
        console.error("Cannot load image");
        //do something else...
      }

      // Now that we've set event handlers, give the image a path and get started
      image.src = "http://metvuw.com/forecast/" + this.imgPrefetch1;
    }
  }


  autoPlay() {
    if (this.playing === false) {
      // start playing
      this.playing = true;
      this.loopingNext();
    } else {
      // stop playing
      this.playing = false;
    }
  }
}
