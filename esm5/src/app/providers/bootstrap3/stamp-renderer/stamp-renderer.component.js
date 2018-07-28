/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var Bootstrap3StampRendererComponent = /** @class */ (function () {
    function Bootstrap3StampRendererComponent() {
    }
    Bootstrap3StampRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-stamp-renderer',
                    template: "<ng-container [ngSwitch]=\"stamp.headerSize\">\n  <h1 *ngSwitchCase=\"1\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h1>\n  <h2 *ngSwitchCase=\"2\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h2>\n  <h3 *ngSwitchCase=\"3\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h3>\n  <h4 *ngSwitchCase=\"4\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h4>\n  <h5 *ngSwitchCase=\"5\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h5>\n  <h6 *ngSwitchCase=\"6\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h6>\n  <p *ngSwitchDefault [ngClass]=\"stamp.classes\">{{stamp.text}}</p>\n</ng-container>\n"
                },] },
    ];
    Bootstrap3StampRendererComponent.propDecorators = {
        stamp: [{ type: Input }]
    };
    return Bootstrap3StampRendererComponent;
}());
export { Bootstrap3StampRendererComponent };
function Bootstrap3StampRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3StampRendererComponent.prototype.stamp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbXAtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9zdGFtcC1yZW5kZXJlci9zdGFtcC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztnQkFHaEQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSwya0JBU1g7aUJBQ0E7Ozt3QkFFRSxLQUFLOzsyQ0FqQlI7O1NBZ0JhLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RhbXBSZW5kZXJlciwgSVN0YW1wIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvc3RhbXAucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInN0YW1wLmhlYWRlclNpemVcIj5cclxuICA8aDEgKm5nU3dpdGNoQ2FzZT1cIjFcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2gxPlxyXG4gIDxoMiAqbmdTd2l0Y2hDYXNlPVwiMlwiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDI+XHJcbiAgPGgzICpuZ1N3aXRjaENhc2U9XCIzXCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oMz5cclxuICA8aDQgKm5nU3dpdGNoQ2FzZT1cIjRcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2g0PlxyXG4gIDxoNSAqbmdTd2l0Y2hDYXNlPVwiNVwiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDU+XHJcbiAgPGg2ICpuZ1N3aXRjaENhc2U9XCI2XCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oNj5cclxuICA8cCAqbmdTd2l0Y2hEZWZhdWx0IFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvcD5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgU3RhbXBSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgc3RhbXA6IElTdGFtcDtcclxufVxyXG4iXX0=