import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RecipeModel } from '../../core/recipe/recipe.model';
import { RecipeService } from '../../core/recipe/services/recipe.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-recipe-template-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  
  templateUrl: './recipe-template-form.component.html',
  styleUrl: './recipe-template-form.component.scss'
})
export class RecipeTemplateFormComponent implements OnInit {
  showForm: boolean = false;

  @Input() isEditMode = false;
  @Input() currentRecipe: RecipeModel | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    if (this.currentRecipe) {
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newRecipe: RecipeModel = {
        id: this.isEditMode ? this.currentRecipe!.id : Date.now(), 
        title: form.value.title,
        description: form.value.description,
        ingredients: form.value.ingredients.split(","),
        preparationTime: form.value.preparationTime,
        difficulty: form.value.difficulty,
      };

      if (this.isEditMode) {
        this.recipeService.editRecipe(newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }

      form.reset();
      this.showForm = false;
    }
  }

}
