import { FormSubmissionErrors } from './services/form-state.service';

export interface FormSubmission {
  value: any;
  onComplete: (errors?: FormSubmissionErrors) => void;
}
