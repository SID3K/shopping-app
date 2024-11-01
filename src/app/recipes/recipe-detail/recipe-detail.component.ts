import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router){}

  ngOnInit(){
    //this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    )

    this.recipe = this.recipeService.getRecipes()[this.id];
  }

  toShoppingList(){
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipeById(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});

  }
  
}
