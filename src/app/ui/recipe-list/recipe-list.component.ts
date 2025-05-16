import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RecipeModel } from '../../core/recipe/recipe.model';
import { RecipeService } from '../../core/recipe/services/recipe.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
     MatSelectModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})

export class RecipeListComponent implements OnInit {
    // Output is making connection goin g child => parent of virable or class 
    // in this case we will pass recipeSelected wich is RecipeModel object or null
  @Output() recipeSelected = new EventEmitter<RecipeModel | null>();
  recipes: RecipeModel[] = [];
    // Connecting inputed data from parent into virable
  currentRecipeTitle?: string;
  selectedRecipe: RecipeModel | null = null; 
    // Injecting recipeService in to scope of this class
  constructor(private recipeService: RecipeService) {}
    // Function that will get all recepes from db and store it in object array
  private getRecipes(): void {
    this.recipeService
      .getRecipes()
      .pipe(
        tap((recipesFromGetRecipesMethod: RecipeModel[]) => { 
          this.recipes = recipesFromGetRecipesMethod; // Lambda statment that passes array of obaject to scope of this class
        })
      )
      .subscribe();


  }
    // Second lifecycle of componennt method that in our case will load data using getRecipes() function
  ngOnInit(): void {
    this.getRecipes();
    
  }
    // Functian that pass selected recepe to parent
onRecipeSelected(recipe: RecipeModel) {
  this.currentRecipeTitle = recipe.title;
  this.selectedRecipe = recipe;
  this.recipeSelected.emit(recipe); // Emit is a call to pass virable from child to parent using output connection 
}
    // Deletes the selected recipe and refreshes the recipe list
onDeleteRecipe(id: number): void {
  this.recipeService.deleteRecipe(id).subscribe(() => {  
  this.recipeSelected.emit(null);
  this.recipeService.getRecipes()
  });
}
}
