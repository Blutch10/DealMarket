import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../auth/auth.login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
    
    constructor(private auth: AuthService, private router: Router) {}

    /**
     * Checks whether the app has authenticated the user or not.
     * @returns True if it's the case, false otherwise.
     */
    canActivate() : boolean {
        if (this.auth.isAuthenticated)
            return true;
        this.router.navigate(['']);
        return false;
    }

}