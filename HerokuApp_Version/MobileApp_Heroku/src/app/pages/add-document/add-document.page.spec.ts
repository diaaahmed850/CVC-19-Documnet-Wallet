import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentPage } from './add-document.page';

describe('AddDocumentPage', () => {
  let component: AddDocumentPage;
  let fixture: ComponentFixture<AddDocumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
