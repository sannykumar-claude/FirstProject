import { Injectable } from '@angular/core';
import {  BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationComponent } from './components/models/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   public bsmodalref?:BsModalRef
  constructor(private modalService:BsModalService) {

   }

public isShowNotification(isSuccess:boolean,title:string,message:string){
  const inialstate:ModalOptions = {
    initialState :
    {
      isSuccess,title,message
    }
  }
   this.bsmodalref=this.modalService.show(NotificationComponent,inialstate)
}

}
