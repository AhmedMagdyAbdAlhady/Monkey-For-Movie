import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInDashbordComponent } from './log-in-dashbord.component';

describe('LogInDashbordComponent', () => {
  let component: LogInDashbordComponent;
  let fixture: ComponentFixture<LogInDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogInDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
