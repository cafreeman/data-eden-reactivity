export interface ReactiveSignal<T> {
  read(): T;
  write(value: T): void;
}

export interface ReactiveAdapter {
  create<T>(value: T): ReactiveSignal<T>;
}
