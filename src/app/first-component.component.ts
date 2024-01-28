import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirstServiceService } from './first-service.service';
import { Observable, finalize } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {
  @ViewChild('closeModal') public closeModal!: ElementRef

  public isModalOpen: boolean = false;
  
  players! : any[];
  clubNames!: string[];
  nationalityNames!: string[];
  positionNames!: string[];
  name!: string;
  position!: string;
  nationality!: string;
  club!: string;

  constructor(private service: FirstServiceService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.getAllPlayers().subscribe(
      (dbPlayers)=> {
        this.players = dbPlayers;
        this.clubNames = this.getUniqueClubNames();
        this.positionNames = this.getUniquePositionNames();
        this.nationalityNames = this.getUniqueNationalityNames();
      }
    )
  }
  getUniqueClubNames(): string[] {
    const clubArray: any[] = [];
    for (const player of this.players) {
      if (!clubArray.includes(player.club)) {
        clubArray.push(player.club);
      }
    }
    return clubArray;
  }
  getUniquePositionNames(): string[] {
    const positionArray: any[] = [];
    for (const player of this.players) {
      if (!positionArray.includes(player.position)) {
        positionArray.push(player.position);
      }
    }
    return positionArray;
  }
  getUniqueNationalityNames(): string[] {
    const nationalityArray: any[] = [];
    for (const player of this.players) {
      if (!nationalityArray.includes(player.nationality)) {
        nationalityArray.push(player.nationality);
      }
    }
    return nationalityArray;
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
  onDelete(id: number): void {
    this.service.deletePlayer(id).subscribe(
      () => {
        this.players = this.players.filter(p => p.id !== id);
        const backDrop = document.querySelector('.modal-backdrop');
        if (backDrop) {
          backDrop.classList.add('d-none');
        }
        
      }
    );
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
        this.closeModal.nativeElement.click();
      },
      (error) => {
        window.alert(error.error);
      }
    );
  }

}
