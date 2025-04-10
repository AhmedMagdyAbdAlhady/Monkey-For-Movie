import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardsComponent } from './create-cards.component';

describe('CreateCardsComponent', () => {
  let component: CreateCardsComponent;
  let fixture: ComponentFixture<CreateCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
