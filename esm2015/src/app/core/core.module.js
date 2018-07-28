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
export class DeReCrudCoreModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBbUIxRSxNQUFNOzs7WUFqQkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsNEJBQTRCO29CQUM1QixpQkFBaUI7aUJBQ2xCO2dCQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDO2dCQUNqRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztnQkFDbkcsZUFBZSxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vaG9zdHMvY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSW5wdXRGaWVsZEhvc3RDb21wb25lbnQgfSBmcm9tICcuL2hvc3RzL2lucHV0LWZpZWxkLWhvc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQnV0dG9uSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvYnV0dG9uLWhvc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQgfSBmcm9tICcuL2hvc3RzL2NvbGxlY3Rpb24tZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFtcEZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvc3RhbXAtZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvZm9ybS1ob3N0L2Zvcm0taG9zdC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIENvbXBvbmVudEhvc3REaXJlY3RpdmUsXHJcbiAgICBJbnB1dEZpZWxkSG9zdENvbXBvbmVudCxcclxuICAgIFN0YW1wRmllbGRIb3N0Q29tcG9uZW50LFxyXG4gICAgQnV0dG9uSG9zdENvbXBvbmVudCxcclxuICAgIENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQsXHJcbiAgICBGb3JtSG9zdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbRm9ybVN0YXRlU2VydmljZSwgRm9ybUJ1aWxkZXJTZXJ2aWNlXSxcclxuICBleHBvcnRzOiBbSW5wdXRGaWVsZEhvc3RDb21wb25lbnQsIFN0YW1wRmllbGRIb3N0Q29tcG9uZW50LCBCdXR0b25Ib3N0Q29tcG9uZW50LCBGb3JtSG9zdENvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERlUmVDcnVkQ29yZU1vZHVsZSB7IH1cclxuIl19