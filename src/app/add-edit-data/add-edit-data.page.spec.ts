import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDataPage } from './add-edit-data.page';

describe('AddEditDataPage', () => {
  let component: AddEditDataPage;
  let fixture: ComponentFixture<AddEditDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddEditDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
