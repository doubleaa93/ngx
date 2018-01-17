import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaHtmlPreviewerComponent } from './schema-html-previewer.component';

describe('SchemaHtmlPreviewerComponent', () => {
  let component: SchemaHtmlPreviewerComponent;
  let fixture: ComponentFixture<SchemaHtmlPreviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaHtmlPreviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaHtmlPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
