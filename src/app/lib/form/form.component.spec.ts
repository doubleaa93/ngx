import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule,
  MockNgRedux
} from '@angular-redux/store/testing';
import { MockComponent } from 'ng2-mock-component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgReduxFormModule } from '@angular-redux/form';
import { FormComponent } from './form.component';
import { DeReCrudOptions } from '../models/options';
import { SchemaActions } from '../redux/actions/schema-actions';
import { FormBuilderService } from '../form-builder.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let ngReduxSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NgReduxTestingModule,
        NgReduxFormModule
      ],
      providers: [FormBuilderService],
      declarations: [
        FormComponent,
        MockComponent({
          selector: 'de-re-crud-field-host',
          inputs: ['form', 'struct', 'field']
        })
      ]
    }).compileComponents();

    MockNgRedux.reset();
  });

  beforeEach(() => {
    ngReduxSpy = spyOn(MockNgRedux.mockInstance, 'dispatch');
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.options = {
      schema: {},
      struct: 'struct',
      block: 'default'
    };

    fixture.detectChanges();
  });

  it('should call init on store', () => {
    expect(ngReduxSpy).toHaveBeenCalledWith({
      type: SchemaActions.INIT,
      payload: { formId: component.formId, options: component.options }
    });
  });
});
