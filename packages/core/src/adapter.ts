export interface ReactiveSignal<T> {
  value: T;
}

export interface ReactiveAdapter {
  create<T>(value: T): ReactiveSignal<T>;
}
