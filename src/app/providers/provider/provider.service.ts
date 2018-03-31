import { Injectable } from '@angular/core';
import { DeReCrudProviderOptions } from './provider-options';

@Injectable()
export class DeReCrudProviderService{
  private _cache: { [name: string]: DeReCrudProviderOptions } = {};

  register(name: string, options: DeReCrudProviderOptions) {
    this._cache[name] = options;
  }

  get(name: string): DeReCrudProviderOptions {
    const options = this._cache[name];
    if (!options) {
      throw new Error(`Provider '${name}' is not registered. Make sure register(name, options) is called in the applicatio root.`);
    }

    return options;
  }
}
