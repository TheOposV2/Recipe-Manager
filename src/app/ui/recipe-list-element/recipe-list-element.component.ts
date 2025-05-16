import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeModel } from '../../core/recipe/recipe.model';
import { NgClass } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-recipe-list-element',
  standalone: true,
  imports: [NgClass, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatButtonModule ],
  templateUrl: './recipe-list-element.component.html',
  styleUrl: './recipe-list-element.component.scss'
})

export class RecipeListElementComponent {
    //Input is a function that estabishes connection parent to child 
  @Input() recipe !: RecipeModel;
  @Input() selectedTitle?: string;
  @Output() recipeSelected = new EventEmitter<RecipeModel>();
  @Output() recipeRemoved = new EventEmitter<number>();
  // Passing element to delete
  onDeleteRecipe(id: number): void {
    this.recipeRemoved.emit(id);
}

}
