import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TypeGuard implements CanActivate {

  URLtype: string = '';
  URLid: string = '';

  constructor(
    private router: Router,
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

    this.URLtype = route.params['userType']
    this.URLid = route.params['userId']

    let type: string | null = localStorage.getItem('userType')
    let token: string | null = localStorage.getItem('user-token');
    let id: string | null = localStorage.getItem('id');

    if(token==='superpower') return true //TODO :esto se quita!
    
    if (type !== this.URLtype) {
      this.router.navigate(['/area/' + type + '/' + id]);
      return false;
    }
    
    if(id !== this.URLid){
      this.router.navigate(['/area/' + type + '/' + id]);
      return false;
    }
    return true;
  }
  
}
