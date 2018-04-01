import { TestBed, inject } from '@angular/core/testing';

import { FormStateService } from './form-state.service';
import { FormBuilderService } from './form-builder.service';
import { FormBuilder } from '@angular/forms';

describe('FormStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder, FormStateService, FormBuilderService]
    });
  });

  it(
    'should be created',
    inject([FormStateService], (service: FormStateService) => {
      expect(service).toBeTruthy();
    })
  );
});
