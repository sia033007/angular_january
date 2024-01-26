import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirstServiceService } from './first-service.service';
import { Observable } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {
  
  players! : any[];
  name!: string;
  position!: string;
  nationality!: string;
  club!: string;

  constructor(private service: FirstServiceService) { }

  ngOnInit(): void {
    this.service.getAllPlayers().subscribe(
      (getPlayers)=> this.players = getPlayers 
    )
  }
  //get players with an id multiplied by 2
  /*
  ngOnInit(): void {
    this.service.getAllPlayers().pipe(
      map((players: any[]) => players.map(player => ({ ...player, id: player.id * 2 })))
    ).subscribe(
      (getPlayers) => this.players = getPlayers
    );
  }
  */
  onDelete(id: number): void{
    this.service.deletePlayer(id).subscribe(
      ()=> this.players = this.players.filter(p=> p.id != id)
    )
  }
  addPlayer(): void{
    const newPlayer = {
      "Name": this.name,
      "Position": this.position,
      "Nationality": this.nationality,
      "Club": this.club
    }
    this.service.addPlayer(newPlayer).subscribe(
      () => {
        this.players.push(newPlayer);
        // Clear the form fields after successful addition
        this.name = '';
        this.position = '';
        this.nationality = '';
        this.club = '';
      },
      (error) => {
        // Handle error, if needed
      }
    );
  }

}
