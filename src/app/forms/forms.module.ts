import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DeReCrudCoreModule } from '../core/core.module';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    DeReCrudCoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormComponent
  ],
  exports: [FormComponent]
})
export class DeReCrudFormsModule { }
