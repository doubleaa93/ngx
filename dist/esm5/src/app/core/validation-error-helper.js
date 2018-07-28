/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
var ValidationErrorHelper = /** @class */ (function () {
    function ValidationErrorHelper() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    ValidationErrorHelper.getFormControlIfErrorFound = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
        var formControl = control.form.get(control.field.name);
        if ((!formControl.errors || !formControl.touched) &&
            !control.submissionErrors.length) {
            return null;
        }
        return formControl;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ValidationErrorHelper.hasError = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return !!this.getFormControlIfErrorFound(control);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ValidationErrorHelper.getErrors = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var e_1, _a;
        /** @type {?} */
        var formControl = this.getFormControlIfErrorFound(control);
        if (!formControl) {
            return null;
        }
        /** @type {?} */
        var sortedErrors = [];
        /** @type {?} */
        var unsortedErrors = [];
        if (formControl.errors && formControl.touched) {
            try {
                for (var _b = tslib_1.__values(Object.keys(formControl.errors)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    /** @type {?} */
                    var sort = this._errorSort[key];
                    /** @type {?} */
                    var metadata = formControl.errors[key];
                    if (typeof sort === 'undefined') {
                        unsortedErrors.push({ key: key, metadata: metadata });
                    }
                    else {
                        sortedErrors.push({ key: key, metadata: metadata, sort: sort });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return sortedErrors
            .sort(function (x) { return x.sort; })
            .concat(unsortedErrors)
            .map(this.getErrorMessage)
            .concat(control.submissionErrors);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    ValidationErrorHelper.getErrorMessage = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        switch (error.key) {
            case 'required':
                return 'This field is required.';
            case 'minlength':
                return "This field must have at least " + error.metadata.requiredLength + " characters.";
            case 'maxlength':
                return "This field can not exceed " + error.metadata.requiredLength + " characters.";
            default:
                return "Validation failed with error: " + error;
        }
    };
    ValidationErrorHelper._errorSort = ['required'];
    return ValidationErrorHelper;
}());
export { ValidationErrorHelper };
function ValidationErrorHelper_tsickle_Closure_declarations() {
    /** @type {?} */
    ValidationErrorHelper._errorSort;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1lcnJvci1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBTWlCLGdEQUEwQjs7OztjQUFDLE9BQWlCOztRQUN6RCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpELElBQ0UsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQzdDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFDaEM7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxXQUFXLENBQUM7Ozs7OztJQUdkLDhCQUFROzs7O0lBQWYsVUFBZ0IsT0FBaUI7UUFDL0IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ25EOzs7OztJQUVNLCtCQUFTOzs7O0lBQWhCLFVBQWlCLE9BQWlCOzs7UUFDaEMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUM7U0FDYjs7UUFFRCxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7O1FBQ3hCLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUUxQixJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTs7Z0JBQzdDLEtBQWtCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBOUMsSUFBTSxHQUFHLFdBQUE7O29CQUNaLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7O29CQUNsQyxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUV6QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRTt3QkFDL0IsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUMsQ0FBQztxQkFDeEM7eUJBQU07d0JBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztxQkFDNUM7aUJBQ0Y7Ozs7Ozs7OztTQUNGO1FBRUQsT0FBTyxZQUFZO2FBQ2hCLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDO2FBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUM7YUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUVNLHFDQUFlOzs7O0lBQXRCLFVBQXVCLEtBQXFDO1FBQzFELFFBQVEsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNqQixLQUFLLFVBQVU7Z0JBQ2IsT0FBTyx5QkFBeUIsQ0FBQztZQUNuQyxLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxtQ0FDTCxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsaUJBQ2pCLENBQUM7WUFDakIsS0FBSyxXQUFXO2dCQUNkLE9BQU8sK0JBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLGlCQUNqQixDQUFDO1lBQ2pCO2dCQUNFLE9BQU8sbUNBQWlDLEtBQU8sQ0FBQztTQUNuRDtLQUNGO3VDQS9EMkIsQ0FBQyxVQUFVLENBQUM7Z0NBSjFDOztTQUdhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb250cm9sIH0gZnJvbSAnLi9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkVycm9ySGVscGVyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfZXJyb3JTb3J0ID0gWydyZXF1aXJlZCddO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBnZXRGb3JtQ29udHJvbElmRXJyb3JGb3VuZChjb250cm9sOiBJQ29udHJvbCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBjb250cm9sLmZvcm0uZ2V0KGNvbnRyb2wuZmllbGQubmFtZSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIWZvcm1Db250cm9sLmVycm9ycyB8fCAhZm9ybUNvbnRyb2wudG91Y2hlZCkgJiZcclxuICAgICAgIWNvbnRyb2wuc3VibWlzc2lvbkVycm9ycy5sZW5ndGhcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaGFzRXJyb3IoY29udHJvbDogSUNvbnRyb2wpIHtcclxuICAgIHJldHVybiAhIXRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RXJyb3JzKGNvbnRyb2w6IElDb250cm9sKSB7XHJcbiAgICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgICBpZiAoIWZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnRlZEVycm9ycyA9IFtdO1xyXG4gICAgY29uc3QgdW5zb3J0ZWRFcnJvcnMgPSBbXTtcclxuXHJcbiAgICBpZiAoZm9ybUNvbnRyb2wuZXJyb3JzICYmIGZvcm1Db250cm9sLnRvdWNoZWQpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybUNvbnRyb2wuZXJyb3JzKSkge1xyXG4gICAgICAgIGNvbnN0IHNvcnQgPSB0aGlzLl9lcnJvclNvcnRba2V5XTtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGZvcm1Db250cm9sLmVycm9yc1trZXldO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB1bnNvcnRlZEVycm9ycy5wdXNoKHsga2V5LCBtZXRhZGF0YSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc29ydGVkRXJyb3JzLnB1c2goeyBrZXksIG1ldGFkYXRhLCBzb3J0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3J0ZWRFcnJvcnNcclxuICAgICAgLnNvcnQoeCA9PiB4LnNvcnQpXHJcbiAgICAgIC5jb25jYXQodW5zb3J0ZWRFcnJvcnMpXHJcbiAgICAgIC5tYXAodGhpcy5nZXRFcnJvck1lc3NhZ2UpXHJcbiAgICAgIC5jb25jYXQoY29udHJvbC5zdWJtaXNzaW9uRXJyb3JzKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFcnJvck1lc3NhZ2UoZXJyb3I6IHsga2V5OiBzdHJpbmc7IG1ldGFkYXRhOiBhbnkgfSkge1xyXG4gICAgc3dpdGNoIChlcnJvci5rZXkpIHtcclxuICAgICAgY2FzZSAncmVxdWlyZWQnOlxyXG4gICAgICAgIHJldHVybiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4nO1xyXG4gICAgICBjYXNlICdtaW5sZW5ndGgnOlxyXG4gICAgICAgIHJldHVybiBgVGhpcyBmaWVsZCBtdXN0IGhhdmUgYXQgbGVhc3QgJHtcclxuICAgICAgICAgIGVycm9yLm1ldGFkYXRhLnJlcXVpcmVkTGVuZ3RoXHJcbiAgICAgICAgfSBjaGFyYWN0ZXJzLmA7XHJcbiAgICAgIGNhc2UgJ21heGxlbmd0aCc6XHJcbiAgICAgICAgcmV0dXJuIGBUaGlzIGZpZWxkIGNhbiBub3QgZXhjZWVkICR7XHJcbiAgICAgICAgICBlcnJvci5tZXRhZGF0YS5yZXF1aXJlZExlbmd0aFxyXG4gICAgICAgIH0gY2hhcmFjdGVycy5gO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBgVmFsaWRhdGlvbiBmYWlsZWQgd2l0aCBlcnJvcjogJHtlcnJvcn1gO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=