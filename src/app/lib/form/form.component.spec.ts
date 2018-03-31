import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule,
  MockNgRedux
} from '@angular-redux/store/testing';
import { MockComponent } from 'ng2-mock-component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgReduxFormModule } from '@angular-redux/form';
import { FormComponent } from './form.component';
import { SchemaActions } from '../redux/actions/schema-actions';
import { FormBuilderService } from '../services/form-builder.service';

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
          inputs: ['options', 'form', 'field']
        }),
        MockComponent({
          selector: 'de-re-crud-button-host',
          inputs: ['options', 'type', 'text', 'disabled']
        })
      ]
    }).compileComponents();

    MockNgRedux.reset();
  });

  beforeEach(() => {
    ngReduxSpy = spyOn(MockNgRedux.getInstance(), 'dispatch');
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.options = {
      provider: 'provider',
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
