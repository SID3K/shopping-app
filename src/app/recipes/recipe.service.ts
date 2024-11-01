import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Fish Fry',
    //     'Fish fry',
    //     'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVjaXBlfGVufDB8fDB8fHww',
    //     [new Ingredient('masala',3),new Ingredient('chicken',5)]),
    //     new Recipe('Crunchy fish',
    //     'Salad Fish',
    //     'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVjaXBlfGVufDB8fDB8fHww',
    //     [new Ingredient('Jira',10),new Ingredient('Apple',3)])
    //   ];

    private recipes: Recipe[];

      constructor(private slService:ShoppingListService){}

      getRecipes(){
        return this.recipes.slice();
      }

      setRecipes(recipes1:Recipe[]){
        this. recipes = recipes1;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipeById(id:number){
        return this.recipes[id];
      }

      addToShoppingList(ing:Ingredient[]){
        this.slService.addIngredients(ing);
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(id:number,newRecipe:Recipe){
        this.recipes[id]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipeById(id:number){
        this.recipes.splice(id,1);
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteIngredientById(recipeId:number,ingrId:number){
        // console.log("---------")
        // console.log( this.recipes[recipeId].ingredients.length);
        this.recipes[recipeId].ingredients.splice(ingrId,1);
        // console.log( this.recipes[recipeId].ingredients.length);
        // console.log("---------")
        this.recipesChanged.next(this.recipes.slice());
      }
}