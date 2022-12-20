import { Injectable } from '@angular/core';
import {  CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private router: Router
    ) { }

  canActivate(): boolean | UrlTree {

    let type: string | null = localStorage.getItem('userType')
    let id: string | null = localStorage.getItem('id');
    
    let token: string | null = localStorage.getItem('user-token');
    if(token==='superpower') return true //TODO :esto se quita!
    
    if (type === 'admin') {
      this.router.navigate(['/area/' + type + '/' + id]);
      return false;
    } 
    return true;
  }
}