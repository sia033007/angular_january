import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstServiceService } from './first-service.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player!: any;

  constructor(private route: ActivatedRoute, private service: FirstServiceService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getPlayer(id).subscribe(
      (dbPlayer)=> this.player = dbPlayer
    )
  }
  onUpdate(): void{
this.service.updatePlayer(this.player).subscribe(
  ()=> this.router.navigateByUrl('/players')
)
  }

}
