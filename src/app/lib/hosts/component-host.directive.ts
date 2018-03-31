import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[deReCrudComponentHost]'
})
export class ComponentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

