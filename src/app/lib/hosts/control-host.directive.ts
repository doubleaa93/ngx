import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[deReCrudControlHost]'
})
export class ControlHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
