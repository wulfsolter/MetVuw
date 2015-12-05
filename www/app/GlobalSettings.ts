// Angular2 Singleton Pattern by @elecash -  Raúl Jiménez
// http://twofuckingdevelopers.com/2015/04/angular-2-singleton-service/

export class GlobalSettings {
  region: string = 'nzsi';
  static instance:GlobalSettings;
  static isCreating:Boolean = false;

  constructor() {
    if (!GlobalSettings.isCreating) {
      throw new Error("You can't call new in Singleton instances!");
    }
  }

  static getInstance() {
    if (GlobalSettings.instance == null) {
      GlobalSettings.isCreating = true;
      GlobalSettings.instance = new GlobalSettings();
      GlobalSettings.isCreating = false;
    }

    return GlobalSettings.instance;
  }

  setRegion(region:String) {
      this.region = region;
      console.log('region set to:' + region);
  }

  getRegion() {
      return this.region;
  }

}