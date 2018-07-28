/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
export class DeReCrudProviderService {
    constructor() {
        this._cache = {};
    }
    /**
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    register(name, options) {
        this._cache[name] = options;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    get(name) {
        /** @type {?} */
        const options = this._cache[name];
        if (!options) {
            throw new Error(`Provider '${name}' is not registered. Make sure register(name, options) is called in the applicatio root.`);
        }
        return options;
    }
}
DeReCrudProviderService.decorators = [
    { type: Injectable },
];
function DeReCrudProviderService_tsickle_Closure_declarations() {
    /** @type {?} */
    DeReCrudProviderService.prototype._cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsTUFBTTs7c0JBQzBELEVBQUU7Ozs7Ozs7SUFFaEUsUUFBUSxDQUFDLElBQVksRUFBRSxPQUFnQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztLQUM3Qjs7Ozs7SUFFRCxHQUFHLENBQUMsSUFBWTs7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSwwRkFBMEYsQ0FBQyxDQUFDO1NBQzlIO1FBRUQsT0FBTyxPQUFPLENBQUM7S0FDaEI7OztZQWZGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zIH0gZnJvbSAnLi9wcm92aWRlci1vcHRpb25zJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9jYWNoZTogeyBbbmFtZTogc3RyaW5nXTogRGVSZUNydWRQcm92aWRlck9wdGlvbnMgfSA9IHt9O1xyXG5cclxuICByZWdpc3RlcihuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zKSB7XHJcbiAgICB0aGlzLl9jYWNoZVtuYW1lXSA9IG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXQobmFtZTogc3RyaW5nKTogRGVSZUNydWRQcm92aWRlck9wdGlvbnMge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX2NhY2hlW25hbWVdO1xyXG4gICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvdmlkZXIgJyR7bmFtZX0nIGlzIG5vdCByZWdpc3RlcmVkLiBNYWtlIHN1cmUgcmVnaXN0ZXIobmFtZSwgb3B0aW9ucykgaXMgY2FsbGVkIGluIHRoZSBhcHBsaWNhdGlvIHJvb3QuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==