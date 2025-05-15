import { Injectable } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { map, Observable } from 'rxjs';
import { HttpClientModule } from  '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

 getRecipes(): Observable<RecipeModel[]> {
 
    return this.httpClient.get<RecipeModel[]>(`${this.baseUrl}/recipes`);
  }

  getRecipeById(id: number): Observable<RecipeModel | undefined> {
    return this.httpClient.get<RecipeModel>(`${this.baseUrl}/recipes/${id}`);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/recipes/${id}`);
  }

  addRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    return this.httpClient.post<RecipeModel>(`${this.baseUrl}/recipes`, recipe);
  }

  editRecipe(updatedRecipe: RecipeModel): Observable<RecipeModel> {
    return this.httpClient.put<RecipeModel>(`${this.baseUrl}/recipes/${updatedRecipe.id}`, updatedRecipe);
  }

  getPopularIngredients(): Observable<string[]> {
    return this.httpClient.get<{ popularIngredients: string[] }>(`${this.baseUrl}/ingredients`).pipe(map((result) => result.popularIngredients));
  }
}
