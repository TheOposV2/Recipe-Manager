import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeReactiveFormComponent } from './recipe-reactive-form.component';

describe('RecipeReactiveFormComponent', () => {
  let component: RecipeReactiveFormComponent;
  let fixture: ComponentFixture<RecipeReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeReactiveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
