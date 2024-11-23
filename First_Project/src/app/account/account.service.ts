import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { register } from '../shared/models/register';
import { environment } from 'src/environments/environment.development';
import { login } from '../shared/models/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  login(model:login){
    return this.http.post(`${environment.appUrl}/api/account/login`,model);
   }

    register(model:register){
     return this.http.post(`${environment.appUrl}/api/account/register`,model);
    }


}
