/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class Bootstrap3ButtonRendererComponent {
    /**
     * @return {?}
     */
    get classes() {
        /** @type {?} */
        let classes;
        if (this._classes) {
            classes = this._classes;
        }
        if (this.button.extraClasses) {
            classes = (classes || []).concat(this.button.extraClasses);
        }
        return classes;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateClasses();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["button"]) {
            if (changes["button"].currentValue.type !==
                changes["button"].previousValue.type) {
                this.updateClasses();
            }
        }
    }
    /**
     * @return {?}
     */
    updateClasses() {
        if (this.button.class) {
            this._classes = [this.button.class];
            return;
        }
        switch (this.button.type) {
            case 'submit':
                this._classes = ['btn-primary'];
                break;
            default:
                this._classes = ['btn-default'];
                break;
        }
    }
}
Bootstrap3ButtonRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-button-renderer',
                template: `<button class="btn" [ngClass]="classes"
        [type]="button.type"
        [disabled]="button.disabled"
        (click)="button.onClick($event)">
  {{button.text}}
</button>
`
            },] },
];
Bootstrap3ButtonRendererComponent.propDecorators = {
    button: [{ type: Input }]
};
function Bootstrap3ButtonRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3ButtonRendererComponent.prototype.button;
    /** @type {?} */
    Bootstrap3ButtonRendererComponent.prototype._classes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXJlbmRlcmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvYnV0dG9uLXJlbmRlcmVyL2J1dHRvbi1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBYXZCLE1BQU07Ozs7SUFJSixJQUFJLE9BQU87O1FBQ1QsSUFBSSxPQUFPLENBQVc7UUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUM1QixPQUFPLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLE9BQU8sQ0FBQztLQUNoQjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEI7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxZQUFTO1lBQ2xCLElBQ0UsT0FBTyxXQUFRLFlBQVksQ0FBQyxJQUFJO2dCQUNoQyxPQUFPLFdBQVEsYUFBYSxDQUFDLElBQUksRUFDakM7Z0JBQ0EsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCO1NBQ0Y7S0FDRjs7OztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLE9BQU87U0FDUjtRQUVELFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDeEIsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtTQUNUO0tBQ0Y7OztZQXpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsUUFBUSxFQUFFOzs7Ozs7Q0FNWDthQUNBOzs7cUJBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCdXR0b25SZW5kZXJlciwgSUJ1dHRvbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2J1dHRvbi5yZW5kZXJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1idXR0b24tcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIFtuZ0NsYXNzXT1cImNsYXNzZXNcIlxyXG4gICAgICAgIFt0eXBlXT1cImJ1dHRvbi50eXBlXCJcclxuICAgICAgICBbZGlzYWJsZWRdPVwiYnV0dG9uLmRpc2FibGVkXCJcclxuICAgICAgICAoY2xpY2spPVwiYnV0dG9uLm9uQ2xpY2soJGV2ZW50KVwiPlxyXG4gIHt7YnV0dG9uLnRleHR9fVxyXG48L2J1dHRvbj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEJ1dHRvblJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBidXR0b246IElCdXR0b247XHJcbiAgX2NsYXNzZXM6IHN0cmluZ1tdO1xyXG5cclxuICBnZXQgY2xhc3NlcygpIHtcclxuICAgIGxldCBjbGFzc2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBpZiAodGhpcy5fY2xhc3Nlcykge1xyXG4gICAgICBjbGFzc2VzID0gdGhpcy5fY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5idXR0b24uZXh0cmFDbGFzc2VzKSB7XHJcbiAgICAgIGNsYXNzZXMgPSAoY2xhc3NlcyB8fCBbXSkuY29uY2F0KHRoaXMuYnV0dG9uLmV4dHJhQ2xhc3Nlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudXBkYXRlQ2xhc3NlcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuYnV0dG9uKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBjaGFuZ2VzLmJ1dHRvbi5jdXJyZW50VmFsdWUudHlwZSAhPT1cclxuICAgICAgICBjaGFuZ2VzLmJ1dHRvbi5wcmV2aW91c1ZhbHVlLnR5cGVcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUNsYXNzZXMoKSB7XHJcbiAgICBpZiAodGhpcy5idXR0b24uY2xhc3MpIHtcclxuICAgICAgdGhpcy5fY2xhc3NlcyA9IFt0aGlzLmJ1dHRvbi5jbGFzc107XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuYnV0dG9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3VibWl0JzpcclxuICAgICAgICB0aGlzLl9jbGFzc2VzID0gWydidG4tcHJpbWFyeSddO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuX2NsYXNzZXMgPSBbJ2J0bi1kZWZhdWx0J107XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==