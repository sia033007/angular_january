import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { FirstServiceService } from './first-service.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService {

  constructor(private service : FirstServiceService) { }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   return this.service.getToken().pipe(
  //     switchMap((token: any) => {
  //       if(token){
  //         req = req.clone({
  //           setHeaders: {
  //             Authorization: "Bearer " + token
  //           }
  //         });
  //       }
  //       return next.handle(req);
  //     }),
  //     catchError((error) => {
  //       console.error('Token retrieval error:', error);
  //       // Forward the error to the caller
  //       return throwError(error);
  //     })
  //   );
  // }

}
