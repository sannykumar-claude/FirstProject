import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup = new FormGroup({})
  public submitted =  false;
  public errorMessages:string[]=[]
  public returnUrl:string|null=null;
  constructor(private accoutService:AccountService,private formBuilder:FormBuilder,private router:Router,private activatedRoutes:ActivatedRoute){
    this.accoutService.user$.pipe((take(1))).subscribe({
      next:(user:User | null)=>{
        if(user){
          this.router.navigateByUrl('/')
        }else{
        this.activatedRoutes.queryParamMap.subscribe({
          next:(param:any)=>{
          if(param){
           this.returnUrl= param.get('returnUrl')
          }}
        })
        }
        }
    })

  }
  ngOnInit(): void {
    this.initializeForm()
  }
  public initializeForm(){
    this.loginForm = this.formBuilder.group({
    userName:['',Validators.required],
    password:['',Validators.required]
    })  }


   public login(){
    debugger
    this.submitted=true;
   this.errorMessages=[];
   if(this.loginForm.valid){
    this.accoutService.login(this.loginForm.value).subscribe({
      next:(Response:any)=>{
        if(this.returnUrl){
         this.router.navigateByUrl(this.returnUrl)
        }else{
          this.router.navigateByUrl('/')
        }
      },
      error:error=>{
        if(error.error.error){
          this.errorMessages=error.error.error
        }else{
          this.errorMessages.push(error.error)
        }
      }
     })
   }
   } 
}
