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
  recipe: RecipeModel | undefined;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    const id = idParam ? Number(idParam) : null;

    if(id != null){
      this.recipeService.getRecipeById(id).pipe(tap(recipe => this.recipe = recipe)).subscribe();
    }
  }
}
