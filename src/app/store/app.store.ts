import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialAppSlice } from './app.slice';
import { inject } from '@angular/core';
import {
  changeLanguage,
  resetLanguages,
  setBusy,
  setDictionary,
} from './app.updaters';
import { DictionariesService } from '../services/dictionaries.service';
import { firstValueFrom } from 'rxjs';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withProps(() => {
    const _dictionariesService = inject(DictionariesService);
    const _languages = _dictionariesService.languages;

    return {
      _dictionariesService,
      _languages,
    };
  }),
  withMethods((store) => {
    const _invalidateDictionary = async () => {
      patchState(store, setBusy(true));
      const dictionary = await firstValueFrom(
        store._dictionariesService.getDictionaryWithDelay(
          store.selectedLanguage()
        )
      );
      patchState(store, setBusy(false), setDictionary(dictionary));
    };

    return {
      changeLanguage: async () => {
        patchState(store, changeLanguage(store._languages));
        await _invalidateDictionary();
      },
      _resetLanguages: async () => {
        patchState(store, resetLanguages(store._languages));
        await _invalidateDictionary();
      },
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguages();
    },
  }))
);
