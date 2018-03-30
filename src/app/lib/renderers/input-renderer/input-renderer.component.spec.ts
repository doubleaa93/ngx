import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRendererComponent } from './input-renderer.component';
import { LabelRendererComponent } from '../label-renderer/label-renderer.component';

describe('InputRendererComponent', () => {
  let component: InputRendererComponent;
  let fixture: ComponentFixture<InputRendererComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [InputRendererComponent, LabelRendererComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRendererComponent);
    component = fixture.componentInstance;

    component.control = {
      type: 'text',
      htmlId: 'id',
      key: 'key',
      label: 'label'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
