import { Component, OnInit } from '@angular/core';
import { PlayService } from './play.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit{
  public message:string|undefined
constructor(private playservice:PlayService){

}

  ngOnInit(): void {
    debugger
    this.playservice.getPlayers().subscribe(({
      next:(Response:any | null) =>{ this.message=Response.value.message},
      error:(error)=>{console.log(error)
      }
      
    }))
  }

}
