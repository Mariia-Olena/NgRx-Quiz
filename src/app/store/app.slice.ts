export interface AppSlice {
  readonly selectedLanguage: string;
  readonly possibleLanguage: string[];
}

export const initialAppSlice: AppSlice = {
  selectedLanguage: '',
  possibleLanguage: [],
};
