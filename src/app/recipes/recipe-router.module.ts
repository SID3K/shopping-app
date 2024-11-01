import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth-gaurd";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolver } from "./recipes-resolver";



const appRoutes:Routes = [
    {path:'',component:RecipesComponent, canActivate:[AuthGuard],
        children:[
            {path:'',component:RecipeStartComponent},
            {path:'new',component:RecipeEditComponent},
            {path:':id',component:RecipeDetailComponent,resolve:[RecipesResolver]},
            {path:':id/edit',component:RecipeEditComponent, resolve:[RecipesResolver]}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(appRoutes)],
    exports:[RouterModule]
})

export class RecipeRouterModule{ }