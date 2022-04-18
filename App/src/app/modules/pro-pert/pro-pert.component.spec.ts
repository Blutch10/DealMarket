import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProPertComponent } from './pro-pert.component';

describe('ProPertComponent', () => {
  let component: ProPertComponent;
  let fixture: ComponentFixture<ProPertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProPertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProPertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
