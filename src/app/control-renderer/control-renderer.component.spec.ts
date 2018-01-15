import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRendererComponent } from './control-renderer.component';

describe('ControlRendererComponent', () => {
  let component: ControlRendererComponent;
  let fixture: ComponentFixture<ControlRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
