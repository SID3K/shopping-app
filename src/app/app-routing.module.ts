import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthComponent } from "./auth/auth.component";

const appRoutes : Routes = [
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {path:'recipes',loadChildren:()=>import('./recipes/recipe.module').then(m=>m.RecipeModule)},
    {path:'shopping-list',loadChildren:()=>import('./shopping-list/shopping.module').then(m=>m.ShoppingModule)},
    {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports:[RouterModule]
})

export class AppRoutingModule{}
 