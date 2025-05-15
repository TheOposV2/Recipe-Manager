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
  @Output() recipeSelected = new EventEmitter<RecipeModel | null>();
  recipes: RecipeModel[] = [];
  currentRecipeTitle?: string;
  selectedRecipe: RecipeModel | null = null; 
  
  constructor(private recipeService: RecipeService) {}

  private getRecipes(): void {
    this.recipeService
      .getRecipes()
      .pipe(
        tap((recipesFromGetRecipesMethod: RecipeModel[]) => {
          this.recipes = recipesFromGetRecipesMethod;
        })
      )
      .subscribe();


  }
  ngOnInit(): void {
    this.getRecipes();
    
  }
 
onRecipeSelected(recipe: RecipeModel) {
  this.currentRecipeTitle = recipe.title;
  this.selectedRecipe = recipe;
  this.recipeSelected.emit(recipe);
}

onDeleteRecipe(id: number): void {
  this.recipeService.deleteRecipe(id);
  this.recipeSelected.emit(null);
  this.recipeService.getRecipes()
}
}
