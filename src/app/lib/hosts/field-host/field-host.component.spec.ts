import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldHostComponent } from './field-host.component';

describe('FieldHostComponent', () => {
  let component: FieldHostComponent;
  let fixture: ComponentFixture<FieldHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldHostComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
