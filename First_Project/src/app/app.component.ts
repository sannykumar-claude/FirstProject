import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'First_Project';
  constructor(private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.refreshUser();
  }


  private refreshUser(){
    debugger
    const key = this.accountService.getJWT();
    if(key){
      this.accountService.refreshUser(key).subscribe({
        next:_=>{},
        error:_=>{
          this.accountService.logOut()
        }
      })
    }else{
     this.accountService.refreshUser(null).subscribe();
    }
  }

}
