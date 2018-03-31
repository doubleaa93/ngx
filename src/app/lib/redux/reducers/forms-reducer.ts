import { Actions, FORM_CHANGED } from '../actions';
import { SchemaActions } from '../actions/schema-actions';
import { FormActions } from '../actions/form-actions';

export interface CustomErrors {
  [fieldPath: string]: string[] | CustomErrors;
}

export interface State {
  instances: { [formId: string]: { submitting: boolean } };
  values: { [formId: string]: object };
  customErrors: { [formId: string]: CustomErrors };
}

export function formsReducer(
  state: State = { instances: {}, values: {}, customErrors: {} },
  action: Actions
) {
  switch (action.type) {
    case SchemaActions.INIT_COMPLETE: {
      const { formId } = action.payload;

      return {
        ...state,
        instances: {
          ...state.instances,
          [formId]: { submitting: false }
        }
      };
    }
    case FormActions.SUBMIT:
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.payload]: { submitting: true }
        }
      };
    case FormActions.RESET:
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.payload]: { submitting: false }
        },
        values: {
          ...state.values,
          [action.payload]: {}
        },
        customErrors: {
          ...state.customErrors,
          [action.payload]: {}
        }
      };
    case FormActions.SET_CUSTOM_ERRORS: {
      const { formId, errors } = action.payload;

      return {
        ...state,
        instances: {
          ...state.instances,
          [formId]: { submitting: false }
        },
        customErrors: {
          ...state.customErrors,
          [formId]: errors
        }
      };
    }
    case FormActions.CLEAR_CUSTOM_ERRORS: {
      const { formId, field } = action.payload;
      const fieldCustomErrors = { ...state.customErrors[formId] };

      delete fieldCustomErrors[field];

      return {
        ...state,
        customErrors: {
          ...state.customErrors,
          [formId]: fieldCustomErrors
        }
      };
    }
    case FORM_CHANGED: {
      const { path, value } = action.payload;
      const formId = path[path.length - 1];

      return {
        ...state,
        values: {
          ...state.values,
          [formId]: value
        }
      };
    }
    default:
      return state;
  }
}
