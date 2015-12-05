export class GlobalSettings {
  region: string;
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
  }

  getRegion() {
      return this.region;
  }

}