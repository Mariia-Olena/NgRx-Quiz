import {
  PartialStateUpdater,
  patchState,
  Prettify,
  signalStoreFeature,
  SignalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { exhaustMap, Observable, tap } from 'rxjs';
import { BusySlice } from '../with-busy/with-busy.slice';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { setBusy, setIdle } from '../with-busy/with-busy.updaters';
import { tapResponse } from '@ngrx/operators';

type Update<S extends object> = Partial<Prettify<S>> | PartialStateUpdater<Prettify<S>>;

export function withService<T, S extends object>(
  loader: () => Observable<T>,
  updater: (date: T) => Update<S>
): SignalStoreFeature<
  {
    state: S & BusySlice;
    props: {};
    methods: {};
  },
  {
    state: {};
    props: {};
    methods: {
      _load: () => void;
    };
  }
>;

export function withService<T, S extends object>(
  loader: () => Observable<T>,
  updater: (date: T) => Update<S>
) {
  return signalStoreFeature(
    { state: type<S & BusySlice>() },
    withMethods((store) => {
      const source$ = loader();
      return {
        _load: rxMethod<void>((trigger$) => trigger$.pipe(
          tap(() => patchState(store, setBusy() as any)),
          exhaustMap(() => source$.pipe(
            tapResponse({
              next: (value) => patchState(store, updater(value)),
              error: (error) => console.error(error),
              finalize: () => patchState(store, setIdle() as any),
            })
          ))
        )),
      };
    })
  );
}
