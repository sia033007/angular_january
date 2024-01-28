import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FirstComponentComponent } from './first-component.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerDetailGuard } from './player-detail.guard';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { ClubNameComponent } from './club-name.component';
import { PositionComponent } from './position.component';
import { NationalityComponent } from './nationality.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    PlayerDetailComponent,
    ClubNameComponent,
    PositionComponent,
    NationalityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'players', component: FirstComponentComponent},
      {path:'players/:id',
      canActivate:[PlayerDetailGuard] ,component:PlayerDetailComponent },
      {path:'players/club/:playerClub', component: ClubNameComponent},
      {path:'players/position/:playerPosition', component: PositionComponent},
      {path:'players/nationality/:playerNationality', component: NationalityComponent},
      {path:'', redirectTo:'players', pathMatch:'full'}
    ]),
    FormsModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
