import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule,
  MockNgRedux
} from '@angular-redux/store/testing';

import { FormComponent } from './form.component';
import { DeReCrudOptions } from '../models/options';
import { SchemaActions } from '../redux/actions/schema-actions';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let ngReduxSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [NgReduxTestingModule]
    }).compileComponents();

    MockNgRedux.reset();
  });

  beforeEach(() => {
    ngReduxSpy = spyOn(MockNgRedux.mockInstance, 'dispatch');
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.options = new DeReCrudOptions();

    fixture.detectChanges();
  });

  it('should call init on store', () => {
    expect(ngReduxSpy).toHaveBeenCalledWith({
      type: SchemaActions.INIT,
      formId: jasmine.any(String),
      options: component.options
    });
  });
});
