import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm:FormGroup = new FormGroup({})
  public submitted =  false;
  public errorMessages:string[]=[]


  constructor(private accoutService:AccountService,private formBuilder:FormBuilder,
    private sharedService:SharedService,private router:Router
  ){
    this.accoutService.user$.pipe(take(1)).subscribe({
      next:(user:User |null)=>{
        if(user){
          this.router.navigateByUrl('/');
        }
      }
    })

  }


  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(){
    this.registerForm = this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      lastName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      email:['',[Validators.required,Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]]
    })
  }
  public register(){
  this.submitted=true;
   this.errorMessages=[];
   if(this.registerForm.valid){
    this.accoutService.register(this.registerForm.value).subscribe({
      next:(Response:any)=>{
        this.sharedService.isShowNotification(true,Response.value.title,Response.value.message)
        this.router.navigateByUrl('/account/login')
      },
      error:error=>{
        this.errorMessages=error.error.error
      }
     })
   }
  }

}
