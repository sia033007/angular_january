import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FirstServiceService } from './first-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenResolverService implements Resolve<string> {

  constructor(private service: FirstServiceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    return this.service.getToken();
  }
}
