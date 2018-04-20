import { FormGroup } from '@angular/forms';
import { IField } from '../schema';

export interface ITable {
  formId: number;
  form: FormGroup;
  field: IField;
}
