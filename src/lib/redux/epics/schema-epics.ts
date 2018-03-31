import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { ActionsObservable } from 'redux-observable';
import { IStruct, IField, IBlock } from '../../models/schema';
import { Actions } from '../actions';
import {
  SchemaActions,
  InitAction,
  InitCompleteAction
} from '../actions/schema-actions';

@Injectable()
export class SchemaEpics {
  init(action$: ActionsObservable<Actions>): Observable<Actions> {
    // TODO: Validate schema

    return action$
      .ofType(SchemaActions.INIT)
      .map(({ payload: { formId, options } }) => {
        const structs: IStruct[] = [];
        const fields: IField[] = [];
        const blocks: IBlock[] = [];

        for (const structSchema of options.schema) {
          const struct = {
            name: structSchema.name,
            label: structSchema.label,
            fields: [],
            blocks: []
          };

          for (const fieldSchema of structSchema.fields) {
            const field = {
              id: `${structSchema.name}-${fieldSchema.name}`,
              type: fieldSchema.type,
              keyField: fieldSchema.keyField,
              required: fieldSchema.required,
              name: fieldSchema.name,
              label: fieldSchema.label,
              placeholder: fieldSchema.placeholder || fieldSchema.label,
              struct: structSchema.name
            };

            fields.push(field);
            struct.fields.push(field.id);
          }

          for (const blockSchema of structSchema.blocks) {
            const block = {
              id: `${structSchema.name}-${blockSchema.name}`,
              name: blockSchema.name,
              fields: blockSchema.fields,
              struct: structSchema.name
            };

            blocks.push(block);
            struct.blocks.push(block.id);
          }
        }

        return {
          type: SchemaActions.INIT_COMPLETE,
          payload: { formId, options, structs, fields, blocks }
        } as InitCompleteAction;
      });
  }
}
