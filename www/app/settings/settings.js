import {Page, NavController} from 'ionic/ionic';
import {GlobalSettings} from '../GlobalSettings';

@Page({
  templateUrl: 'app/settings/settings.html'
  providers: [GlobalSettings],
})

export class SettingsPage {
  constructor(nav: NavController) {
    this.nav = nav;

    this.selectedForecast = GlobalSettings.getInstance().getForecast() ||  'rain-nzsi';
    GlobalSettings.getInstance().setForecast(this.selectedForecast);

    this.forecasts = [
      { label: 'NZ - All',                       value: 'rain-nz' },
      { label: 'NZ - North Island',              value: 'rain-nzni' },
      { label: 'NZ - South Island',              value: 'rain-nzsi' },
      { label: 'NZ - Wind @ 1000mb',             value: 'wind1000-nz' },
      { label: 'NZ - Wind @ 850mb',              value: 'wind850-nz' },
      { label: 'NZ - Wind @ 700mb',              value: 'wind700-nz' },
      { label: 'NZ - Wind @ 500mb',              value: 'wind500-nz' },
      { label: 'NZ - Wind @ 300mb',              value: 'wind300-nz' },
      { label: 'NZ - Wind @ 250mb',              value: 'wind250-nz' },
      { label: 'AUS - New South Wales',          value: 'rain-nsw' },
      { label: 'AUS - Perth WA',                 value: 'rain-swaussie' },
      { label: 'AUS - Queensland',               value: 'rain-queensland' },
      { label: 'AUS - South',                    value: 'rain-saussie' },
      { label: 'AUS - South East',               value: 'rain-seaussie' },
      { label: 'AUS - Western',                  value: 'rain-waussie' },
      { label: 'AUS - Victoria + Tasmania',      value: 'rain-victoria' },
      { label: 'PACIFIC - New Caledonia',        value: 'rain-newcaledonia' },
      { label: 'PACIFIC - Fiji',                 value: 'rain-fiji' },
      { label: 'PACIFIC - Pitcairn Island',      value: 'rain-pitcairn' },
      { label: 'PACIFIC - Fiji / New Zealand',   value: 'rain-ocean' },
      { label: 'PACIFIC - South West Pacific',   value: 'rain-swp' },
      { label: 'PACIFIC - South Pacific',        value: 'rain-spacific' },
      { label: 'PACIFIC - All Pacific',          value: 'rain-pacific' },
      { label: 'EUROPE - United Kingdom',        value: 'rain-uk' },
      { label: 'EUROPE - All Europe',            value: 'rain-europe' },
      { label: 'EUROPE - Estonia',               value: 'rain-estonia' },
      { label: 'EUROPE - Turkey',                value: 'rain-turkey' },
      { label: 'JAPAN - Japan',                  value: 'rain-japan' },
      { label: 'USA - United States of America', value: 'rain-usa' },
      { label: 'AFRICA - South Africa',          value: 'rain-safrica' },
      { label: 'ATLANTIC - North Atlantic',      value: 'rain-natlantic' },
      { label: 'ATLANTIC - South Atlantic',      value: 'rain-satlantic' },
      { label: 'WORLD - World',                  value: 'rain-world' },
    ];

  }

  itemSelected(forecast) {
    GlobalSettings.getInstance().setForecast(forecast.value);
  }
}
