import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard{
  constructor(private accountService:AccountService,private sharedService:SharedService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      return this.accountService.user$.pipe(map((user:any | null)=>{
        if(user){
          return true;
        }else{
          this.sharedService.isShowNotification(false,"Restricted Area","Leave immediately!")
          this.router.navigate(['account/login'],{queryParams:{returnUrl:state.url}})
          return false;
        }
      }))
  }
  
}
