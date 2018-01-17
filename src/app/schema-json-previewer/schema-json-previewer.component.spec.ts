import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaJsonPreviewerComponent } from './schema-json-previewer.component';

describe('SchemaJsonPreviewerComponent', () => {
  let component: SchemaJsonPreviewerComponent;
  let fixture: ComponentFixture<SchemaJsonPreviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaJsonPreviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaJsonPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
