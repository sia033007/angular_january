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

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    PlayerDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'players', component: FirstComponentComponent},
      {path:'players/:id',
      canActivate:[PlayerDetailGuard] ,component:PlayerDetailComponent },
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
