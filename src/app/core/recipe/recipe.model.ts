export interface RecipeModel {
  id: number; 
  title: string; 
  description: string; 
  ingredients: string[]; 
  preparationTime: number; 
  difficulty: "easy" | "medium" | "hard"; 
}


