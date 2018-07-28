/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class ValidationErrorHelper {
    /**
     * @param {?} control
     * @return {?}
     */
    static getFormControlIfErrorFound(control) {
        /** @type {?} */
        const formControl = control.form.get(control.field.name);
        if ((!formControl.errors || !formControl.touched) &&
            !control.submissionErrors.length) {
            return null;
        }
        return formControl;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static hasError(control) {
        return !!this.getFormControlIfErrorFound(control);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static getErrors(control) {
        /** @type {?} */
        const formControl = this.getFormControlIfErrorFound(control);
        if (!formControl) {
            return null;
        }
        /** @type {?} */
        const sortedErrors = [];
        /** @type {?} */
        const unsortedErrors = [];
        if (formControl.errors && formControl.touched) {
            for (const key of Object.keys(formControl.errors)) {
                /** @type {?} */
                const sort = this._errorSort[key];
                /** @type {?} */
                const metadata = formControl.errors[key];
                if (typeof sort === 'undefined') {
                    unsortedErrors.push({ key, metadata });
                }
                else {
                    sortedErrors.push({ key, metadata, sort });
                }
            }
        }
        return sortedErrors
            .sort(x => x.sort)
            .concat(unsortedErrors)
            .map(this.getErrorMessage)
            .concat(control.submissionErrors);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    static getErrorMessage(error) {
        switch (error.key) {
            case 'required':
                return 'This field is required.';
            case 'minlength':
                return `This field must have at least ${error.metadata.requiredLength} characters.`;
            case 'maxlength':
                return `This field can not exceed ${error.metadata.requiredLength} characters.`;
            default:
                return `Validation failed with error: ${error}`;
        }
    }
}
ValidationErrorHelper._errorSort = ['required'];
function ValidationErrorHelper_tsickle_Closure_declarations() {
    /** @type {?} */
    ValidationErrorHelper._errorSort;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1lcnJvci1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE1BQU07Ozs7O0lBR0ksTUFBTSxDQUFDLDBCQUEwQixDQUFDLE9BQWlCOztRQUN6RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpELElBQ0UsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQzdDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFDaEM7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxXQUFXLENBQUM7Ozs7OztJQUdyQixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWlCO1FBQy9CLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuRDs7Ozs7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQWlCOztRQUNoQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQztTQUNiOztRQUVELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQzs7UUFDeEIsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRTFCLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzdDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDbEMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFekMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7b0JBQy9CLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDNUM7YUFDRjtTQUNGO1FBRUQsT0FBTyxZQUFZO2FBQ2hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDakIsTUFBTSxDQUFDLGNBQWMsQ0FBQzthQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQzthQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDckM7Ozs7O0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFxQztRQUMxRCxRQUFRLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDakIsS0FBSyxVQUFVO2dCQUNiLE9BQU8seUJBQXlCLENBQUM7WUFDbkMsS0FBSyxXQUFXO2dCQUNkLE9BQU8saUNBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUNqQixjQUFjLENBQUM7WUFDakIsS0FBSyxXQUFXO2dCQUNkLE9BQU8sNkJBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUNqQixjQUFjLENBQUM7WUFDakI7Z0JBQ0UsT0FBTyxpQ0FBaUMsS0FBSyxFQUFFLENBQUM7U0FDbkQ7S0FDRjs7bUNBL0QyQixDQUFDLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb250cm9sIH0gZnJvbSAnLi9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkVycm9ySGVscGVyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfZXJyb3JTb3J0ID0gWydyZXF1aXJlZCddO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBnZXRGb3JtQ29udHJvbElmRXJyb3JGb3VuZChjb250cm9sOiBJQ29udHJvbCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBjb250cm9sLmZvcm0uZ2V0KGNvbnRyb2wuZmllbGQubmFtZSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIWZvcm1Db250cm9sLmVycm9ycyB8fCAhZm9ybUNvbnRyb2wudG91Y2hlZCkgJiZcclxuICAgICAgIWNvbnRyb2wuc3VibWlzc2lvbkVycm9ycy5sZW5ndGhcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaGFzRXJyb3IoY29udHJvbDogSUNvbnRyb2wpIHtcclxuICAgIHJldHVybiAhIXRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RXJyb3JzKGNvbnRyb2w6IElDb250cm9sKSB7XHJcbiAgICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgICBpZiAoIWZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnRlZEVycm9ycyA9IFtdO1xyXG4gICAgY29uc3QgdW5zb3J0ZWRFcnJvcnMgPSBbXTtcclxuXHJcbiAgICBpZiAoZm9ybUNvbnRyb2wuZXJyb3JzICYmIGZvcm1Db250cm9sLnRvdWNoZWQpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybUNvbnRyb2wuZXJyb3JzKSkge1xyXG4gICAgICAgIGNvbnN0IHNvcnQgPSB0aGlzLl9lcnJvclNvcnRba2V5XTtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGZvcm1Db250cm9sLmVycm9yc1trZXldO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB1bnNvcnRlZEVycm9ycy5wdXNoKHsga2V5LCBtZXRhZGF0YSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc29ydGVkRXJyb3JzLnB1c2goeyBrZXksIG1ldGFkYXRhLCBzb3J0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3J0ZWRFcnJvcnNcclxuICAgICAgLnNvcnQoeCA9PiB4LnNvcnQpXHJcbiAgICAgIC5jb25jYXQodW5zb3J0ZWRFcnJvcnMpXHJcbiAgICAgIC5tYXAodGhpcy5nZXRFcnJvck1lc3NhZ2UpXHJcbiAgICAgIC5jb25jYXQoY29udHJvbC5zdWJtaXNzaW9uRXJyb3JzKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFcnJvck1lc3NhZ2UoZXJyb3I6IHsga2V5OiBzdHJpbmc7IG1ldGFkYXRhOiBhbnkgfSkge1xyXG4gICAgc3dpdGNoIChlcnJvci5rZXkpIHtcclxuICAgICAgY2FzZSAncmVxdWlyZWQnOlxyXG4gICAgICAgIHJldHVybiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4nO1xyXG4gICAgICBjYXNlICdtaW5sZW5ndGgnOlxyXG4gICAgICAgIHJldHVybiBgVGhpcyBmaWVsZCBtdXN0IGhhdmUgYXQgbGVhc3QgJHtcclxuICAgICAgICAgIGVycm9yLm1ldGFkYXRhLnJlcXVpcmVkTGVuZ3RoXHJcbiAgICAgICAgfSBjaGFyYWN0ZXJzLmA7XHJcbiAgICAgIGNhc2UgJ21heGxlbmd0aCc6XHJcbiAgICAgICAgcmV0dXJuIGBUaGlzIGZpZWxkIGNhbiBub3QgZXhjZWVkICR7XHJcbiAgICAgICAgICBlcnJvci5tZXRhZGF0YS5yZXF1aXJlZExlbmd0aFxyXG4gICAgICAgIH0gY2hhcmFjdGVycy5gO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBgVmFsaWRhdGlvbiBmYWlsZWQgd2l0aCBlcnJvcjogJHtlcnJvcn1gO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=