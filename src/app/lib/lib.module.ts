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
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { SchemaEpics } from './redux/epics/schema-epics';
import { ControlHostDirective } from './hosts/control-host.directive';
import { FieldHostComponent } from './hosts/field-host/field-host.component';

@NgModule({
  imports: [CommonModule, NgReduxModule],
  declarations: [
    FormComponent,
    InputRendererComponent,
    SelectRendererComponent,
    LabelRendererComponent,
    ControlHostDirective,
    FieldHostComponent
  ],
  providers: [SchemaEpics],
  exports: [FormComponent],
  entryComponents: [InputRendererComponent, SelectRendererComponent]
})
export class LibModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private schemaEpics: SchemaEpics
  ) {
    const rootEpic = combineEpics(this.schemaEpics.init);

    const middleware = [createEpicMiddleware(rootEpic), createLogger()];
    const initialState: IAppState = {
      structs: {},
      blocks: {},
      fields: {},
      options: {}
    };

    ngRedux.configureStore(rootReducer, initialState, middleware);
  }
}
