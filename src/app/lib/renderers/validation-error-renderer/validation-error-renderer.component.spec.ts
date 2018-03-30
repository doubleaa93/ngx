import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorRendererComponent } from './validation-error-renderer.component';

describe('ValidationErrorRendererComponent', () => {
  let component: ValidationErrorRendererComponent;
  let fixture: ComponentFixture<ValidationErrorRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrorRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
