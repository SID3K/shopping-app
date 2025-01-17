import { Component, OnDestroy, OnInit } from "@angular/core"; 
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";
@Component({
    selector:'app-shopping-list',
    templateUrl:'./shopping-list.component.html',
    styleUrl:'./shopping-list.component.css',
    providers:[]
})

export class ShoppingListComponent implements OnInit, OnDestroy{
    ingredients: Ingredient[];
    ingredientSubscription:Subscription;
    constructor(private slService:ShoppingListService){}

    ngOnInit(){
        this.ingredients = this.slService.getIngredients();
        this.ingredientSubscription=this.slService.ingredientsChanged
          .subscribe(
            (ingredients: Ingredient[]) => {
              this.ingredients = ingredients;
            }
          );    
    }

    ngOnDestroy(){
      this.ingredientSubscription.unsubscribe();
    }

    onEditItem(index:number){
      this.slService.startedEditing.next(index);
    }

}