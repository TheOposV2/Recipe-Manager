import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './ui/recipe-detail/recipe-detail.component';
import { RecipeReactiveFormComponent } from './ui/recipe-reactive-form/recipe-reactive-form.component';
import { RecipeListComponent } from './ui/recipe-list/recipe-list.component';
import { recipePageResolver } from './core/recipe/resolvers/recipe-page.resolver';

export const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  { path: "recipes", component: RecipeListComponent }, 
    {
   path: 'recipe/add',
   component: RecipeReactiveFormComponent,
   resolve: { recipePageResolver }
  },
  { path: "recipe/edit/:id", component: RecipeReactiveFormComponent }, 
  { path: "recipe/:id", component: RecipeDetailComponent },
];
