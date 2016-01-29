// Draws the scale for "rain fallen in last x hours"

import {Component, View } from 'angular2/core'

interface RainScaleItem {
  value: string;
  color: string;
}

@Component({
  selector: 'rain-scale',
  templateUrl: 'build/RainScale/RainScale.html',
  inputs: ['entries: entries'],
  directives: [],
})

export class RainScale {

  public entries: Array<RainScaleItem>;

  constructor() {
    this.entries = [
      { value: '1',  color: '#ff00ff' },
      { value: '2',  color: '#bf00ff' },
      { value: '3',  color: '#7f00ff' },
      { value: '4',  color: '#3f00ff' },
      { value: '5',  color: '#0000ff' },
      { value: '6',  color: '#003fff' },
      { value: '7',  color: '#007fff' },
      { value: '8',  color: '#00bfff' },
      { value: '9',  color: '#00ffff' },
      { value: '10', color: '#00ffbf' },
      { value: '11', color: '#00ff7f' },
      { value: '12', color: '#00ff3f' },
      { value: '13', color: '#00ff00' },
      { value: '14', color: '#3fff00' },
      { value: '15', color: '#7fff00' },
      { value: '16', color: '#bfff00' },
      { value: '17', color: '#ffff00' },
      { value: '18', color: '#ffbf00' },
      { value: '19', color: '#ff7f00' },
      { value: '20', color: '#ff3f00' },
    ];
  }
}