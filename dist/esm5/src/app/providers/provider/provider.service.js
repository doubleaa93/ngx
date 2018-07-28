/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var DeReCrudProviderService = /** @class */ (function () {
    function DeReCrudProviderService() {
        this._cache = {};
    }
    /**
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    DeReCrudProviderService.prototype.register = /**
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    function (name, options) {
        this._cache[name] = options;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DeReCrudProviderService.prototype.get = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var options = this._cache[name];
        if (!options) {
            throw new Error("Provider '" + name + "' is not registered. Make sure register(name, options) is called in the applicatio root.");
        }
        return options;
    };
    DeReCrudProviderService.decorators = [
        { type: Injectable },
    ];
    return DeReCrudProviderService;
}());
export { DeReCrudProviderService };
function DeReCrudProviderService_tsickle_Closure_declarations() {
    /** @type {?} */
    DeReCrudProviderService.prototype._cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztzQkFLcUIsRUFBRTs7Ozs7OztJQUVoRSwwQ0FBUTs7Ozs7SUFBUixVQUFTLElBQVksRUFBRSxPQUFnQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztLQUM3Qjs7Ozs7SUFFRCxxQ0FBRzs7OztJQUFILFVBQUksSUFBWTs7UUFDZCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWEsSUFBSSw2RkFBMEYsQ0FBQyxDQUFDO1NBQzlIO1FBRUQsT0FBTyxPQUFPLENBQUM7S0FDaEI7O2dCQWZGLFVBQVU7O2tDQUhYOztTQUlhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlck9wdGlvbnMgfSBmcm9tICcuL3Byb3ZpZGVyLW9wdGlvbnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGVSZUNydWRQcm92aWRlclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2NhY2hlOiB7IFtuYW1lOiBzdHJpbmddOiBEZVJlQ3J1ZFByb3ZpZGVyT3B0aW9ucyB9ID0ge307XHJcblxyXG4gIHJlZ2lzdGVyKG5hbWU6IHN0cmluZywgb3B0aW9uczogRGVSZUNydWRQcm92aWRlck9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2NhY2hlW25hbWVdID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIGdldChuYW1lOiBzdHJpbmcpOiBEZVJlQ3J1ZFByb3ZpZGVyT3B0aW9ucyB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fY2FjaGVbbmFtZV07XHJcbiAgICBpZiAoIW9wdGlvbnMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm92aWRlciAnJHtuYW1lfScgaXMgbm90IHJlZ2lzdGVyZWQuIE1ha2Ugc3VyZSByZWdpc3RlcihuYW1lLCBvcHRpb25zKSBpcyBjYWxsZWQgaW4gdGhlIGFwcGxpY2F0aW8gcm9vdC5gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19