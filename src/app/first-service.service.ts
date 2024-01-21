import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers : new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class FirstServiceService {

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<any>{
    return this.http.get<any>(environment.baseUrl);

  }
  deletePlayer(id: number): Observable<any>{
    return this.http.delete(`${environment.baseUrl}/${id}`);

  }
  addPlayer(player: any): Observable<any>{
    return this.http.post(environment.baseUrl, player, httpOptions)
       .pipe(
          catchError((error: any) => {
            if (error.status === 400 && error.error && error.error.errors) {
              const validationErrors = error.error.errors;
              return throwError('Validation error: ' + JSON.stringify(validationErrors));
              // Optionally, you can format and handle the validation errors more extensively
            } else {
              return throwError('An error occurred while adding the player.');
            }
          })
       );
   }
   getPlayer(id: number): Observable<any>{
    return this.http.get(`${environment.baseUrl}/${id}`);
   }
   updatePlayer(player: any): Observable<any>{
    return this.http.patch(`${environment.baseUrl}/${player.id}`, player, httpOptions);
   }
  }


