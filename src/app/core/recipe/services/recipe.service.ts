import { Injectable } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Service for performing HTTP operations on RecipeModel data
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
// Cuse we use fake api this normaly adress of db would be in config files
baseUrl = "http://localhost:3000";
// Constructor - DI in angular we inject httpClient object with it logic in to this class
constructor(private httpClient: HttpClient) { }

    // Fetch all recipes
 getRecipes(): Observable<RecipeModel[]> {
    // Sending http get reqest and waiting for array of recepe models from soecifec adress
    return this.httpClient.get<RecipeModel[]>(`${this.baseUrl}/recipes`);
  }
    // Fetch a recipe by ID
  getRecipeById(id: number): Observable<RecipeModel | undefined> {
    // Sending http get reqest and waiting for recice with specific id from soecifec adress
    return this.httpClient.get<RecipeModel>(`${this.baseUrl}/recipes/${id}`);
  }
    // Delete a recipe by ID
  deleteRecipe(id: number): Observable<void> {
    // Sending http delete reqest and deleting recor with specifc id
    return this.httpClient.delete<void>(`${this.baseUrl}/recipes/${id}`);
  }
    // Add a new recipe
  addRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    // Sendig http post reqest with object to be seved in db
    return this.httpClient.post<RecipeModel>(`${this.baseUrl}/recipes`, recipe);
  }
    // Update an existing recipe
  editRecipe(updatedRecipe: RecipeModel): Observable<RecipeModel> {
    // Sending put reqest and swiching data of specifec id
    console.log(updatedRecipe.id);
    return this.httpClient.put<RecipeModel>(`${this.baseUrl}/recipes/${updatedRecipe.id}`, updatedRecipe);
  }
    // Fetch popular ingredients
  getPopularIngredients(): Observable<string[]> {
    // Sending http get reqest and getting popular ingridens
    return this.httpClient.get<{ popularIngredients: string[] }>(`${this.baseUrl}/ingredients`).pipe(map((result) => result.popularIngredients));
  }
}
