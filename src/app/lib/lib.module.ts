import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { FormComponent } from './form/form.component';
import { InputRendererComponent } from './renderers/input-renderer/input-renderer.component';
import { SelectRendererComponent } from './renderers/select-renderer/select-renderer.component';
import { LabelRendererComponent } from './renderers/label-renderer/label-renderer.component';
import { IAppState } from './redux/state';
import { rootReducer } from './redux/reducers';

@NgModule({
  imports: [CommonModule, NgReduxModule],
  declarations: [
    FormComponent,
    InputRendererComponent,
    SelectRendererComponent,
    LabelRendererComponent
  ],
  exports: [FormComponent]
})
export class LibModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, null, [createLogger()]);
  }
}
