import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs/operators";


export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
)=>{
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.userSub.pipe(
        take(1),
        map(user=>{
        const isAuth = user ? true : false;
        if(isAuth){
            return true;
        }
        return router.createUrlTree(['/auth']);
    }),
    // tap((isAuth)=>{
    //     if(!isAuth){
    //         router.navigate(['/auth']);
    //     }
    // })
    );
}