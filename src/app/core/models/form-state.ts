import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IStruct, IField, IBlock } from './schema';
import { FormSubmissionErrors } from './form-submission';
import { FormChange } from './form-change';
import { DeReCrudOptions } from './options';

export interface FormState {
  id: number;
  options: DeReCrudOptions;
  form: FormGroup;
  structs: Map<string, IStruct>;
  fields: Map<string, IField>;
  blocks: Map<string, IBlock>;
  submissionErrors: FormSubmissionErrors;
  onSubmissionErrorsChange: Observable<FormSubmissionErrors>;
  onValueChange: Observable<FormChange>;
  navigationStack: { struct: string; block: string; path: string; parentPath: string; }[];
  onNavigationChange: Observable<number>;
}
