import { DeReCrudProviderOptions } from './provider-options';
export declare class DeReCrudProviderService {
    private _cache;
    register(name: string, options: DeReCrudProviderOptions): void;
    get(name: string): DeReCrudProviderOptions;
}
