import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgReduxFormModule } from '@angular-redux/form';
import { createLogger } from 'redux-logger';
import { FormComponent } from './form/form.component';
import { IAppState } from './redux/state';
import { rootReducer } from './redux/reducers';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { SchemaEpics } from './redux/epics/schema-epics';
import { FieldHostComponent } from './hosts/field-host.component';
import { ButtonHostComponent } from './hosts/button-host.component';
import { FormBuilderService } from './services/form-builder.service';
import { ComponentHostDirective } from './hosts/component-host.directive';
import { DeReCrudProviderModule } from '../providers/provider/provider.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgReduxModule,
    NgReduxFormModule,
    DeReCrudProviderModule
  ],
  declarations: [
    FormComponent,
    FieldHostComponent,
    ButtonHostComponent,
    ComponentHostDirective
  ],
  providers: [SchemaEpics, FormBuilderService],
  exports: [FormComponent]
})
export class DeReCrudModule {
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
      options: {},
      forms: { instances: {}, values: {}, customErrors: {} }
    };

    ngRedux.configureStore(rootReducer, initialState, middleware);
  }
}
