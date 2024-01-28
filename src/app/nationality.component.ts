import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirstServiceService } from './first-service.service';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit {
  players!: any[];


  constructor(private route: ActivatedRoute, private service: FirstServiceService) { }

  ngOnInit(): void {
    const playerNationality = this.route.snapshot.paramMap.get('playerNationality');
    this.service.getPlayersByNationality(playerNationality).subscribe(
      (dbPlayers) => this.players = dbPlayers
    )
  }

}
