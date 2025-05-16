import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { RecipeModel } from '../../core/recipe/recipe.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../core/recipe/services/recipe.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './recipe-reactive-form.component.html',
  styleUrl: './recipe-reactive-form.component.scss'
})
export class RecipeReactiveFormComponent implements OnInit {
    // to add coments
  @Input() isEditMode = false;
  @Input() currentRecipe: RecipeModel | null = null;
  // to add coments
  showForm = false;
  recipeFormGroup!: FormGroup;
  popularIngredients: string[] = [
  'Tomatoes', 'Onions', 'Garlic', 'Potatoes', 'Carrots', 'Olive oil', 'Butter',
  'Chicken', 'Beef', 'Pork', 'Salt', 'Pepper', 'Paprika', 'Basil', 'Parsley',
  'Oregano', 'Lemon', 'Sugar', 'Flour', 'Eggs', 'Milk', 'Cheese', 'Cream',
  'Bread', 'Rice', 'Pasta', 'Beans', 'Lettuce', 'Spinach', 'Broccoli', 'Mushrooms',
  'Fish', 'Shrimp', 'Soy sauce', 'Vinegar', 'Honey', 'Peppers', 'Zucchini', 'Cucumber',
  'Corn', 'Chili powder'];
  // to add coments
  constructor(
    private fb: FormBuilder, 
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // to add coments
  ngOnInit(): void {
  this.recipeFormGroup = this.fb.group({
  title: ["", [Validators.required, Validators.minLength(3)]],
  description: ["", Validators.required],
  ingredients: [[], Validators.required], 
  difficulty: ["", Validators.required],
  preparationTime: ["", Validators.required],
  });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
    const recipeId = Number(id);
    const recipe = this.recipeService.getRecipeById(recipeId);

    if (recipe) {
      this.recipeFormGroup.patchValue(recipe);
    }
  }
}
  // This funtion was used to  display or hide form
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  // Dunction that operates on submit event
onSubmit(): void {
    if (this.recipeFormGroup.valid) { // If the form is valid, prepare the RecipeModel from form data
      const recipe: RecipeModel = this.recipeFormGroup.value; // Determine if we're editing an existing recipe or creating a new one
      if (this.isEditMode) { // After saving, navigate back to the recipe list
        this.recipeService.editRecipe(recipe); 
      } else {
        this.recipeService.addRecipe(recipe);
      }
      this.router.navigate(["/recipes"]); // We come back to veiw of all recepes
    }
  }
}
