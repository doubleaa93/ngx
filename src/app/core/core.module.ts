import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentHostDirective } from './hosts/component-host.directive';
import { FieldHostComponent } from './hosts/field-host.component';
import { ButtonHostComponent } from './hosts/button-host.component';
import { FormBuilderService } from './services/form-builder.service';
import { FormStateService } from './services/form-state.service';
import { CollectionFieldHostComponent } from './hosts/collection-field-host.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComponentHostDirective,
    FieldHostComponent,
    ButtonHostComponent,
    CollectionFieldHostComponent
  ],
  providers: [FormStateService, FormBuilderService],
  exports: [FieldHostComponent, ButtonHostComponent],
  entryComponents: [CollectionFieldHostComponent]
})
export class DeReCrudCoreModule { }
