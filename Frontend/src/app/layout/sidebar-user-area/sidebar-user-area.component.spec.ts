import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarUserAreaComponent } from './sidebar-user-area.component';

describe('SidebarUserAreaComponent', () => {
  let component: SidebarUserAreaComponent;
  let fixture: ComponentFixture<SidebarUserAreaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarUserAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarUserAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
