import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/User';
import { ConfirmEmail } from 'src/app/shared/models/account/ConfirmEmail';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

public success:boolean=true;


constructor(private accountService:AccountService,private sharedService:SharedService,
            private router:Router,private activatedRoute:ActivatedRoute){

}


  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next:(user:User | null)=>{
        if(user){
          this.router.navigateByUrl('/')
        }else{
          this.activatedRoute.queryParamMap.subscribe({
            next:(params:any)=>{
              const ConfirmEmail:ConfirmEmail={
                token:params.get('token'),
                email:params.get('email')
              }
              this.accountService.confirmEmail(ConfirmEmail).subscribe({
                next:(Response:any)=>{
                   this.sharedService.isShowNotification(true,Response.value.title,Response.value.message)
                },
                error:error=>{
                  this.success=false;
                  this.sharedService.isShowNotification(false,'Failed',error.error)
                }
                
              })
            }
          })
        }
      }
    })
    }

    resendEmailConfirmationLink() {
      this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
    }

}
