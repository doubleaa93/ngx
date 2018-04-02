import { FormControl } from '@angular/forms';
import { whitespaceValidator } from './whitespace-validator';

describe('whitespaceValidator', () => {
  it('should return validation map when whitespace', () => {
    expect(whitespaceValidator(new FormControl(' '))).toEqual({ required: true });
  });

  it('should return null when not whitespace', () => {
    expect(whitespaceValidator(new FormControl('value'))).toEqual(null);
  });
});
