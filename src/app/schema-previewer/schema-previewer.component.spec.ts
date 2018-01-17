import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPreviewerComponent } from './schema-previewer.component';

describe('SchemaPreviewerComponent', () => {
  let component: SchemaPreviewerComponent;
  let fixture: ComponentFixture<SchemaPreviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaPreviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
