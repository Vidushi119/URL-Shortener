import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUrlDialogComponent } from './add-url-dialog.component';

describe('AddUrlDialogComponent', () => {
  let component: AddUrlDialogComponent;
  let fixture: ComponentFixture<AddUrlDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUrlDialogComponent]
    });
    fixture = TestBed.createComponent(AddUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
