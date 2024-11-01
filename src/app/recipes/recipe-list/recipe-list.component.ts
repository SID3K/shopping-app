import { Component, OnDestroy, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[] ;
  subscription:Subscription

  //@Output() recipeSelected = new EventEmitter();

  constructor(private recipeService:RecipeService){}

  ngOnInit(){
    

    this.subscription=this.recipeService.recipesChanged.subscribe(
      (recipes1:Recipe[])=>{
        this.recipes = recipes1;
      }
    )
    this.recipes = this.recipeService.getRecipes();
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeSelected.emit(recipe);
  // }
}
