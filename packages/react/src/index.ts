import type { ReactiveAdapter, ReactiveSignal } from '@data-eden/reactivity';
import { signal } from '@preact/signals-core';

export const adapter: ReactiveAdapter = {
  create<T>(v: T): ReactiveSignal<T> {
    const s = signal(v);

    return {
      read() {
        return s.value;
      },
      write(v: T) {
        console.log('signal write', v);
        s.value = v;
      },
    };
  },
};
