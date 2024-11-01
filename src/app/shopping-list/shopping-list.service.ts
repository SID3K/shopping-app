// import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Mangoes',10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredientByIndex(index:number){
        return this.ingredients[index];
    }

    addIngredient(ingredient1:Ingredient){
        this.ingredients.push(ingredient1);
        this.ingredientsChanged.next(this.ingredients.slice());

    }

    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredients(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}