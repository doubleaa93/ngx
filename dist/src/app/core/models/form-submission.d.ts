export interface FormSubmission {
    value: any;
    onComplete: (errors?: FormSubmissionErrors) => void;
}
export interface FormSubmissionErrors {
    [formPath: string]: string[];
}
