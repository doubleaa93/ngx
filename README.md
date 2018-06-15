# De Re CRUD

Component library for the Angular implementation of De Re CRUD. For documentation about the library, see the [documentation repository](https://github.com/DeReCRUD/documentation).

## Getting Started

Install library:

```bash
npm install --save @de-re-crud/ngx #or, yarn add @de-re-crud/ngx
```

There is currently a temporary peer dependency to `boostrap >= 3 < 4`. (See below for more detail)

Import and register `DeReCrudModule` and a provider:

```typescript
import {
  DeReCrudModule,
  Bootstrap3DeReCrudProviderModule
} from '@de-re-crud/ngx';

@NgModule({
  /* ... */
  imports: [/* ... */, DeReCrudModule, Bootstrap3DeReCrudProviderModule]
})
export class AppModule {}
```

Currently the only provider supported at this time is Bootstrap 3. More will be added in the future and there will be a public API to add custom ones. The Bootstrap 3 module will also be moved to its own package once that is completed.

Create instance of `DeReCrudOptions` and use component selector in template:

```typescript
import { DeReCrudOptions } from '@de-re-crud/ngx';

@Component({ /* ... */ })
export class AppComponent {
  options: DeReCrudOptions = /* ... */
}
```

```html
<de-re-crud-form [options]="options"></de-re-crud-form>
```

## API

### FormComponent (de-re-crud-form)

#### Inputs

`options: DeReCrudOptions` - (required) - Form instance options

```typescript
{
  provider: 'bootstrap3'; // Provider used to render components. Currently 'bootstrap3' is the only supported option.
  schema: [/* ... */]; // Schema definition for the form. See main documentation repo for more details. Not all options are currently supported.
  struct: string; // Struct to render from the schema definition
  block: string; // Block to render from the struct definition,
  submitButtonStyle?: {
    class?: string; // Class to use for all submit buttons, replaces the default
    text?: string; // Text to use for all submit buttons, replaces the default
    appendSchemaLabel?: boolean; // Appends the schema label to the submit button
  },
  cancelButtonStyle?: {
    class?: string; // Class to use for all cancel buttons, replaces the default
    text?: string; // Text to use for all cancel buttons, replaces the default
  },
  changeNotificationType?: 'change' | 'blur'; // Determines when change notifications event are triggered
  extraButtonClasses?: [/* ... */]; // Additional classes to append to all buttons
  headerSize?: 1|2|3|4|5|6; // Default header size to use for stamp fields
}
```

`value: any` - (optional) - Form value, will update entire form values on change

`cancelVisible: boolean`: - (optional, default `false`) - Determines if cancel button is visible

`errors: [formPath: string]: string[]`: (optional) - Initial errors shown when the form is rendered

#### Outputs

`submit: (submission: { value: any, onComplete: (errors?) => void })` - Emitted when form is submitted

The `onComplete` method must be called once a form submission is completed. Passing an errors object into this method will cancel the submission, otherwise passing in a falsy value will cause the form to reset.

`cancel: (event)` - Emitted when form is canceled

This event is only relevant if `cancelVisible` is set to true.

## Roadmap

* Support all features from schema
* Support custom validation rules/functions
* Provide public API for providers
* Improve documentation (including code comments)
* Add tests/coverage
* Add CI
* Schema builder
* Typed schema (as opposed to raw JSON)
