import { CustomErrors } from './redux/reducers/forms-reducer';

export type FormSubmissionCompletionParams = CustomErrors | undefined;

export interface FormSubmission {
  value: any;
  onComplete: (params: FormSubmissionCompletionParams) => void;
}
