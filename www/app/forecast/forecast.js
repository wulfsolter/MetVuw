import {Page, NavController}  from 'ionic/ionic';
import {GlobalSettings}       from '../GlobalSettings/GlobalSettings';
import {RainScale}            from '../RainScale/RainScale';

@Page({
  templateUrl: 'app/forecast/forecast.html',
  providers: [GlobalSettings],
  directives: [RainScale],
})

export class ForecastPage {
  constructor(nav: NavController) {
    this.nav = nav;
    this.playing = false;
    this.sliderMax = 240;

    // Time between now and when the forecast was rendered
    this.nowPointerOffset =  Math.floor((Date.now() - ((Math.floor(Date.now()/86400000) * 86400000) - 21600000))/3600000);

    // usually we will be ahead of the forecast, but by how much
    this.pointerMinimum = Math.ceil(this.nowPointerOffset/6) * 6 || 6;

    // in the constructor so set pointer to minimum
    this.pointer = this.pointerMinimum;

    this.setForecastPath();
    this.updateImgPath();
    this.updateSliderMax();
  }

  setForecastPath(offset) {

    var internalOffset = 21600000;
    if (offset) {
      console.log(offset);
      internalOffset += offset;
    }

    // get latest rendered forecast in Zulu (rendered at 7am NZDT)
    this.forecastPath = new Date((Math.floor(Date.now()/86400000) * 86400000) - internalOffset).toISOString().replace(/[^0-9]+/g, '').substr(0,10);

      var image = new Image();
      image.onload = () => {
        this.updateImgPath();
        //
      }
      image.onerror = (err) => {
        // Probably a 404 for the render - rewind another 6 hrs
        this.setForecastPath(21600000);
      }

      // Now that we've set event handlers, give the image a path and get started
      image.src = "http://metvuw.com/forecast/" + this.forecastPath + '/rain-nzsi-' + this.forecastPath + '-06.gif';

  }

  onPageWillEnter() {
    // We're coming back into this page, best refresh images
    this.updateSliderMax();

    if (this.pointer > this.sliderMax) {
      this.pointer = this.sliderMax;
    }

    this.updateImgPath();
  }

  updateSliderMax() {
    if (GlobalSettings.getInstance().getForecast().value.substr(0,4) === 'wind') {
      this.sliderMax = 168;
    } else {
      this.sliderMax = 240;
    }
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

    this.forecast = GlobalSettings.getInstance().getForecast();

    this.imgPath      = this.forecastPath + '/' + this.forecast.value + '-' + this.forecastPath + '-' + padding(this.pointer) + '.gif';
    this.imgPrefetch1 = this.forecastPath + '/' + this.forecast.value + '-' + this.forecastPath + '-' + padding(this.pointer + 6) + '.gif';
    this.imgPrefetch2 = this.forecastPath + '/' + this.forecast.value + '-' + this.forecastPath + '-' + padding(this.pointer + 12) + '.gif';
    this.imgPrefetch3 = this.forecastPath + '/' + this.forecast.value + '-' + this.forecastPath + '-' + padding(this.pointer + 18) + '.gif';
  }

  next() {
    if (GlobalSettings.getInstance().getForecast().value.substr(0, 4) === 'rain' && this.pointer >= 240) {
      // only a 10 day (240hour) forceast
      return;
    }
    if (GlobalSettings.getInstance().getForecast().value.substr(0, 4) === 'wind' && this.pointer >= 168) {
      // only a 7 day (168hour) forceast
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

  set(evt) {
    this.pointer = parseInt(evt.srcElement.value);
    this.updateImgPath();
  }

  loopingNext() {
    if (this.pointer >= this.sliderMax) {
      this.pointer = this.pointerMinimum;
    }

    if (this.playing) {

      var timeStart = Date.now();
      console.log('this.playing');

      var image = new Image();
      image.onload = () => {
        var timeLength = Date.now() - timeStart;
        if (timeLength < 250) {
          setTimeout(() => {
            this.pointer += 6;
            console.log('waited ' + (250 - timeLength));
            this.updateImgPath();
            setTimeout(() => {
              this.loopingNext();
            }, 250);
          }, (250 - timeLength));
        } else {
          this.pointer += 6;
          this.updateImgPath();
          console.log('took ' + timeLength + ' to load image');
          setTimeout(() => {
            this.loopingNext();
          }, 250);
        }
      }
      image.onerror = function (err) {
        console.log(err);
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
