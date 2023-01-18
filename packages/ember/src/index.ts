import { ReactiveAdapter, ReactiveSignal } from '@data-eden/reactivity';
import {
  createStorage,
  getValue,
  setValue,
} from 'ember-tracked-storage-polyfill';

export const adapter: ReactiveAdapter = {
  create<T>(value: T): ReactiveSignal<T> {
    const s = createStorage(value);

    return {
      read() {
        return getValue(s);
      },
      write(v: T) {
        setValue(s, v);
      },
    };
  },
};
