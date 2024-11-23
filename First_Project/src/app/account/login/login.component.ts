import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup = new FormGroup({})
  public submitted =  false;
  public errorMessages:string[]=[]
  constructor(private accoutService:AccountService,private formBuilder:FormBuilder){

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
      },
      error:error=>{
        this.errorMessages=[error.error]
      }
     })
   }
   } 
}
