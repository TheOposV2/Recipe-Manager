import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecipeListComponent } from './ui/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './ui/recipe-detail/recipe-detail.component';
import { RecipeModel } from './core/recipe/recipe.model';
import { RecipeTemplateFormComponent } from './ui/recipe-template-form/recipe-template-form.component';
import { RecipeReactiveFormComponent } from "./ui/recipe-reactive-form/recipe-reactive-form.component";
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-manager';
isLoading: boolean = false;
  // Logic of spinner 

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      // Activation of spinner at start of page
      if (e instanceof NavigationStart) {
        this.isLoading = true; 
      }
      if (e instanceof NavigationEnd) {
        this.isLoading = false; 
      }
      if (e instanceof NavigationCancel) {
        this.isLoading = false;
      }
      if (e instanceof NavigationError) {
        this.isLoading = false;
      }
    });
  }
}

