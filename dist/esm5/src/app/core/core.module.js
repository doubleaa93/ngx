/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentHostDirective } from './hosts/component-host.directive';
import { InputFieldHostComponent } from './hosts/input-field-host.component';
import { ButtonHostComponent } from './hosts/button-host.component';
import { FormBuilderService } from './services/form-builder.service';
import { FormStateService } from './services/form-state.service';
import { CollectionFieldHostComponent } from './hosts/collection-field-host.component';
import { StampFieldHostComponent } from './hosts/stamp-field-host.component';
import { FormHostComponent } from './hosts/form-host/form-host.component';
var DeReCrudCoreModule = /** @class */ (function () {
    function DeReCrudCoreModule() {
    }
    DeReCrudCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule
                    ],
                    declarations: [
                        ComponentHostDirective,
                        InputFieldHostComponent,
                        StampFieldHostComponent,
                        ButtonHostComponent,
                        CollectionFieldHostComponent,
                        FormHostComponent
                    ],
                    providers: [FormStateService, FormBuilderService],
                    exports: [InputFieldHostComponent, StampFieldHostComponent, ButtonHostComponent, FormHostComponent],
                    entryComponents: [CollectionFieldHostComponent]
                },] },
    ];
    return DeReCrudCoreModule;
}());
export { DeReCrudCoreModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7OztnQkFFekUsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLG1CQUFtQjt3QkFDbkIsNEJBQTRCO3dCQUM1QixpQkFBaUI7cUJBQ2xCO29CQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztvQkFDbkcsZUFBZSxFQUFFLENBQUMsNEJBQTRCLENBQUM7aUJBQ2hEOzs2QkE3QkQ7O1NBOEJhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIH0gZnJvbSAnLi9ob3N0cy9jb21wb25lbnQtaG9zdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJbnB1dEZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvaW5wdXQtZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCdXR0b25Ib3N0Q29tcG9uZW50IH0gZnJvbSAnLi9ob3N0cy9idXR0b24taG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvY29sbGVjdGlvbi1maWVsZC1ob3N0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YW1wRmllbGRIb3N0Q29tcG9uZW50IH0gZnJvbSAnLi9ob3N0cy9zdGFtcC1maWVsZC1ob3N0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1Ib3N0Q29tcG9uZW50IH0gZnJvbSAnLi9ob3N0cy9mb3JtLWhvc3QvZm9ybS1ob3N0LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSxcclxuICAgIElucHV0RmllbGRIb3N0Q29tcG9uZW50LFxyXG4gICAgU3RhbXBGaWVsZEhvc3RDb21wb25lbnQsXHJcbiAgICBCdXR0b25Ib3N0Q29tcG9uZW50LFxyXG4gICAgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCxcclxuICAgIEZvcm1Ib3N0Q29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtGb3JtU3RhdGVTZXJ2aWNlLCBGb3JtQnVpbGRlclNlcnZpY2VdLFxyXG4gIGV4cG9ydHM6IFtJbnB1dEZpZWxkSG9zdENvbXBvbmVudCwgU3RhbXBGaWVsZEhvc3RDb21wb25lbnQsIEJ1dHRvbkhvc3RDb21wb25lbnQsIEZvcm1Ib3N0Q29tcG9uZW50XSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVSZUNydWRDb3JlTW9kdWxlIHsgfVxyXG4iXX0=