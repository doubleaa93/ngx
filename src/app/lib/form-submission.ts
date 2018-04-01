import { CustomErrors } from './services/form-state.service';

export type FormSubmissionCompletionParams = CustomErrors | undefined;

export interface FormSubmission {
  value: any;
  onComplete: (params: FormSubmissionCompletionParams) => void;
}
