import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreLoaderComponent } from './pre-loader.component';

describe('PreLoaderComponent', () => {
  let component: PreLoaderComponent;
  let fixture: ComponentFixture<PreLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
