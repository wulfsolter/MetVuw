import {Page, NavController} from 'ionic/ionic';
import {GlobalSettings} from '../GlobalSettings';

@Page({
  templateUrl: 'app/home/home.html'
  providers: [GlobalSettings],
})

export class HomePage {
  constructor(nav: NavController) {
    this.nav = nav;

    this.regions = [
      { label: 'NZ - All',          value: 'nz' },
      { label: 'NZ - North Island', value: 'nzni' },
      { label: 'NZ - South Island', value: 'nzsi' },
    ];

  }

  itemSelected(region) {
    GlobalSettings.getInstance().setRegion(region.value);
  }
}
