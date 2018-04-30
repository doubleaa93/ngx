import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IStruct, IField, IBlock } from './schema';
import { FormSubmissionErrors } from './form-submission';
import { FormChange } from './form-change';
import { DeReCrudOptions } from './options';

export interface FormState {
  id: number;
  parentId: number | null;
  parentPath: string | null;
  parentForm: AbstractControl | null;
  options: DeReCrudOptions;
  form: FormGroup;
  structs: Map<string, IStruct>;
  fields: Map<string, IField>;
  blocks: Map<string, IBlock>;
  submissionErrors: FormSubmissionErrors;
  onSubmissionErrorsChange: Observable<FormSubmissionErrors>;
  onValueChange: Observable<FormChange>;
  navigationStack: { id: number }[];
  onNavigationChange: Observable<number>;
}
