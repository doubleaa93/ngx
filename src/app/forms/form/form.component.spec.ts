import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormHostComponent } from '../../core/hosts/form-host/form-host.component';
import { InputFieldHostComponent } from '../../core/hosts/input-field-host.component';
import { ButtonHostComponent } from '../../core/hosts/button-host.component';
import { FormStateService } from '../../core/services/form-state.service';
import { FormBuilderService } from '../../core/services/form-builder.service';
import { FormComponent } from './form.component';
import { StampFieldHostComponent } from '../../core/hosts/stamp-field-host.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let stateService: FormStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [FormBuilder, FormStateService, FormBuilderService],
      declarations: [FormComponent, FormHostComponent, StampFieldHostComponent, InputFieldHostComponent, ButtonHostComponent]
    }).compileComponents();

    stateService = TestBed.get(FormStateService);
    spyOn(stateService, 'create').and.callFake((options) => ({
      options,
      navigationStack: [],
      onNavigationChange: jasmine.createSpyObj('onNavigationChange', ['subscribe']),
      onValueChange: jasmine.createSpyObj('onValueChange', ['subscribe'])
    }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.options = {
      provider: 'bootstrap3',
      schema: {},
      struct: 'struct',
      block: 'default'
    };

    fixture.detectChanges();
  });

  it('should call create on state service', () => {
    expect(stateService.create).toHaveBeenCalledWith(component.options, undefined, undefined);
  });
});
