import { ReactiveAdapter, ReactiveSignal } from '@data-eden/reactivity';
import { tracked } from '@glimmer/tracking';

class Foo<T> {
  @tracked value: T;

  constructor(value: T) {
    this.value = value;
  }

  read() {
    return this.value;
  }

  write(v: T) {
    this.value = v;
  }
}

export const adapter: ReactiveAdapter = {
  create<T>(value: T): ReactiveSignal<T> {
    return new Foo(value);
  },
};
