export interface Setting {
  id: number;
  configuration: any;
  type: string;
}

export interface Settings {
  currentSetting: Setting;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
