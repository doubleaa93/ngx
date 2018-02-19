import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { DeReCrudModule } from './lib.module';
import { AppComponent } from './app.component';
import { PrettyJsonPipe } from './pretty-json.pipe';
import { SchemaBuilderComponent } from './schema-builder/schema-builder.component';
import { SchemaHtmlPreviewerComponent } from './schema-html-previewer/schema-html-previewer.component';
import { SchemaJsonPreviewerComponent } from './schema-json-previewer/schema-json-previewer.component';
import { SchemaPreviewerComponent } from './schema-previewer/schema-previewer.component';
import configureStore from './store/configure-store';
import { IAppState } from './store/types';

@NgModule({
  declarations: [
    AppComponent,
    PrettyJsonPipe,
    SchemaBuilderComponent,
    SchemaHtmlPreviewerComponent,
    SchemaJsonPreviewerComponent,
    SchemaPreviewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DeReCrudModule,
    ClipboardModule,
    NgReduxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    const store = configureStore();

    ngRedux.provideStore(store);
  }
}
