import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponentGrave } from './list.component';

describe('ListComponent', () => {
  let component: ListComponentGrave;
  let fixture: ComponentFixture<ListComponentGrave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponentGrave ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponentGrave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
