import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn:'root'
})

export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService:AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
         return this.http.put('https://ng-recipe-book-a86ca-default-rtdb.firebaseio.com/recipes.json',recipes,{
            params: new HttpParams().set('auth',this.authService.userToken1)
         }).subscribe(
            (reponseData)=>{
                console.log(reponseData);
            }
         );
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-recipe-book-a86ca-default-rtdb.firebaseio.com/recipes.json',{
            params: new HttpParams().set('auth',this.authService.userToken1)
        })
        .pipe(  
            map( response =>{
                return response.map(response=>{
                    return {...response,
                        ingredients : response.ingredients ? response.ingredients : []
                    };
                });
            }),
            tap( response=>{
                this.recipeService.setRecipes(response);   
            })
        );
        
    }
}     
