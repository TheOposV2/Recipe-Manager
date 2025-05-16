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
import { switchMap } from 'rxjs';

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
      console.log(this.recipeFormGroup.value);
      const recipe: RecipeModel = this.recipeFormGroup.value;

      const idParam = this.route.snapshot.paramMap.get("id");
      const id = idParam ? Number(idParam) : null; // Ternary operator allowing to change that string or null to number of null 

       // Determine if we're editing an existing recipe or creating a new one
      if (id !== null) { // After saving, navigate back to the recipe list
        recipe.id = id;
        console.log("edit")
        this.recipeService.editRecipe(recipe).subscribe(() => {  //need to remember about subscribe 
        this.router.navigate(["/recipes"]);
        }); 
      }
      // adding gives id + 1 like string id = 4 and i get 41 not 5 as id 
      // it is not needed for this app so it is left alone
      else {
        this.recipeService.getLastRecipeId().pipe(
        switchMap(id=> {
        recipe.id = id + 1;
        console.log(recipe.id);
        return this.recipeService.addRecipe(recipe);
        })
        ).subscribe(() => {
        this.router.navigate(['/recipes']);
        });
      }
       // We come back to veiw of all recepes
    }
  }
}
