import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean | UrlTree {
    
    let token: string | null = localStorage.getItem('user-token');
    //TODO :esto se quita!
    if(token==='superpower') return true
    
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } 
    
    return true;
  }
  
}
