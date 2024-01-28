import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirstServiceService } from './first-service.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  players!: any[];

  constructor(private route: ActivatedRoute, private service: FirstServiceService) { }

  ngOnInit(): void {
    const playerPosition = this.route.snapshot.paramMap.get('playerPosition');
    this.service.getPlayersByPosition(playerPosition).subscribe(
      (dbPlayers) => this.players = dbPlayers
    )

  }

}
