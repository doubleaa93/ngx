import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormComponent],
  exports: [FormComponent]
})
export class LibModule { }
