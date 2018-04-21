import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentHostDirective } from './hosts/component-host.directive';
import { FieldHostComponent } from './hosts/field-host.component';
import { ButtonHostComponent } from './hosts/button-host.component';
import { FormBuilderService } from './services/form-builder.service';
import { FormStateService } from './services/form-state.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComponentHostDirective,
    FieldHostComponent,
    ButtonHostComponent
  ],
  providers: [FormStateService, FormBuilderService],
  exports: [FieldHostComponent, ButtonHostComponent]
})
export class DeReCrudCoreModule { }
