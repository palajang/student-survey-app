import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySurveysComponent } from './modify-surveys.component';

describe('ModifySurveysComponent', () => {
  let component: ModifySurveysComponent;
  let fixture: ComponentFixture<ModifySurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifySurveysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifySurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
