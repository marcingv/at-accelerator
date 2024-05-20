import { computed, signal, Signal, WritableSignal } from "@angular/core";

export abstract class BrowserStorage {
  private readonly VALUES_SIGNALS_MAP: { [key: string]: WritableSignal<unknown> } = {};

  protected abstract storageProvider(): Storage;

  public getItem<T>(key: string): T | null {
    return this.getWritableSignal<T>(key)();
  }

  public setItem<T>(key: string, value: T): void {
    this.storageProvider().setItem(key, JSON.stringify(value));
    this.getWritableSignal(key).set(value);
  }

  public hasItem(key: string): boolean {
    return !!this.getWritableSignal(key)();
  }

  public clearItem(key: string): void {
    this.getWritableSignal(key).set(null);
  }

  public getItemSignal<T>(key: string): Signal<T | null> {
    const signal = this.getWritableSignal<T>(key);

    return signal.asReadonly();
  }

  public hasItemSignal(key: string): Signal<boolean> {
    return computed<boolean>(() => {
      return !!this.getWritableSignal(key)();
    });
  }

  private getWritableSignal<T>(key: string): WritableSignal<T | null> {
    if (!this.VALUES_SIGNALS_MAP[key]) {
      this.VALUES_SIGNALS_MAP[key] = signal<T | null>(this.readItemValue(key));
    }

    return this.VALUES_SIGNALS_MAP[key] as WritableSignal<T | null>;
  }

  private readItemValue<T>(key: string): T | null {
    const json = this.storageProvider().getItem(key);
    if (!json || !json.length) {
      return null;
    }

    return JSON.parse(json) as T;
  }
}
