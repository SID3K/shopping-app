import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { RecipeService } from "./recipe.service";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs";

// @Injectable({ providedIn: 'root' })
// export class RecipesResolverService implements ResolveFn<Recipe[]>{
 
    // constructor(private dataStorageService: DataStorageService,
    //     private recipeService: RecipeService) { }
 
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const recipes = this.recipeService.getRecipes();
    //     if (recipes.length === 0) {
    //         return this.dataStorageService.fetchRecipes();
    //     } else {
    //         return recipes;
    //     }
    // }

    export const RecipesResolver: ResolveFn<Recipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Recipe[]> | Promise<Recipe[]> | Recipe[]  =>{
        const dataStorageService = inject(DataStorageService);
        const recipeServie = inject(RecipeService);
        const recipes = recipeServie.getRecipes();
        if (recipes.length === 0) {
                return dataStorageService.fetchRecipes();
        } 
        else {
            return recipes;
        }
    }
