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

@NgModule({
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
})
export class DeReCrudCoreModule { }
