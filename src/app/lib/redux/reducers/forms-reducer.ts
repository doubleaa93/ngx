import { Actions, FORM_CHANGED } from '../actions';

export interface State {
  instances: { [formId: string]: { valid: boolean } };
  values: { [formId: string]: object };
}

export function formsReducer(
  state: State = { instances: {}, values: {} },
  action: Actions
) {
  switch (action.type) {
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
