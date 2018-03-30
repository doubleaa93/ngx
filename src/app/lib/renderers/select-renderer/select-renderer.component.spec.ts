import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRendererComponent } from './select-renderer.component';
import { LabelRendererComponent } from '../label-renderer/label-renderer.component';

describe('SelectRendererComponent', () => {
  let component: SelectRendererComponent;
  let fixture: ComponentFixture<SelectRendererComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SelectRendererComponent, LabelRendererComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRendererComponent);
    component = fixture.componentInstance;

    component.control = {
      type: 'select',
      htmlId: 'id',
      key: 'key',
      label: 'label',
      options: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
