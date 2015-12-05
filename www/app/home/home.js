import {Page, NavController} from 'ionic/ionic';
import {GlobalSettings} from '../GlobalSettings';

@Page({
  templateUrl: 'app/home/home.html'
  providers: [GlobalSettings],
})

export class HomePage {
  constructor(nav: NavController) {
    this.nav = nav;

    this.selectedRegion = GlobalSettings.getInstance().getRegion() ||  'nzsi';
    GlobalSettings.getInstance().setRegion(this.selectedRegion);

    this.regions = [
      { label: 'NZ - All',                  value: 'nz' },
      { label: 'NZ - North Island',         value: 'nzni' },
      { label: 'NZ - South Island',         value: 'nzsi' },
      { label: 'AUS - New South Wales',     value: 'nsw' },
      { label: 'AUS - Perth WA',            value: 'swaussie' },
      { label: 'AUS - Queensland',          value: 'queensland' },
      { label: 'AUS - South',               value: 'saussie' },
      { label: 'AUS - South East',          value: 'seaussie' },
      { label: 'AUS - Western',             value: 'waussie' },
      { label: 'AUS - Victoria + Tasmania', value: 'victoria' },
    ];

  }

  itemSelected(region) {
    GlobalSettings.getInstance().setRegion(region.value);
  }
}
