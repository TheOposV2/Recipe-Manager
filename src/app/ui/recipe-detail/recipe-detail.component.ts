import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../core/recipe/recipe.model';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../core/recipe/services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { tap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})

export class RecipeDetailComponent implements OnInit {
  // declaration of helper virable
  recipe: RecipeModel | undefined;

  // Di of route and recipe classes in to this class
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  // 
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id"); // Gets the id param from the route in string or null
    const id = idParam ? Number(idParam) : null; // Ternary operator allowing to change that string or null to number of null 

    if(id != null){ // If null we dont do anny thing we can add error handeling
      this.recipeService.getRecipeById(id) // Calling fuiction that was injected to this class with id
      .pipe // Allow us to modyfe output 
      (tap // Acesing data wiothout changing
        (recipe => this.recipe = recipe) // Uses the tap operator to assign the fetched recipe to the local variable for display
      ).subscribe(); // Submiting reqest nesesery for operation to take place
    }
  }
}
