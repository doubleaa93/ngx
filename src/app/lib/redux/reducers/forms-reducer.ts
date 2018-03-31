import { Actions, FORM_CHANGED } from '../actions';
import { SchemaActions } from '../actions/schema-actions';

export interface State {
  instances: { [formId: string]: { valid: boolean } };
  values: { [formId: string]: object };
}

export function formsReducer(
  state: State = { instances: {}, values: {} },
  action: Actions
) {
  switch (action.type) {
    case SchemaActions.INIT_COMPLETE: {
      const { formId, value } = action.payload;

      return {
        ...state,
        instances: {
          ...state.instances,
          [formId]: { valid: false }
        },
        values: {
          ...state.values,
          [formId]: value || {}
        }
      };
    }
    case FORM_CHANGED: {
      const { path, value, valid } = action.payload;
      const formId = path[path.length - 1];

      return {
        ...state,
        instances: {
          ...state.instances,
          [formId]: { valid }
        },
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
