import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirstServiceService } from './first-service.service';

@Component({
  selector: 'app-club-name',
  templateUrl: './club-name.component.html',
  styleUrls: ['./club-name.component.css']
})
export class ClubNameComponent implements OnInit {
  players!: any[];

  constructor(private route: ActivatedRoute, private service: FirstServiceService) { }

  ngOnInit(): void {
    const playerClub = this.route.snapshot.paramMap.get('playerClub');

    this.service.getPlayersByClub(playerClub).subscribe(
      (dbPlayers) => this.players = dbPlayers
    )

  }

}
