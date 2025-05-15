import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTemplateFormComponent } from './recipe-template-form.component';

describe('RecipeTemplateFormComponent', () => {
  let component: RecipeTemplateFormComponent;
  let fixture: ComponentFixture<RecipeTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTemplateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
