import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoSinglePageComponent } from './go-single-page.component';

describe('GoSinglePageComponent', () => {
  let component: GoSinglePageComponent;
  let fixture: ComponentFixture<GoSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoSinglePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
