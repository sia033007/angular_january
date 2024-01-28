import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// const httpOptions = {
//   headers : new HttpHeaders(
//     {
//       'Content-Type': 'application/json'
//     }
//   )
// }

@Injectable({
  providedIn: 'root'
})
export class FirstServiceService {

  constructor(private http: HttpClient) { }

  setToken(http: HttpClient, url: string, crud: string, body?: any): Observable<any>{
    return this.getToken().pipe(
      switchMap((token: any) => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
        switch (crud) {
          case 'get':
            return http.get(url);
          case 'sortBy':
            return http.get(url, {headers:header});
          case 'post':
            return http.post(url, body, {headers: header});
          case 'patch':
            return http.patch(url, body, {headers: header});
          case 'delete':
            return http.delete(url, {headers: header});
          default:
            throw new Error('Invalid CRUD operation');
        }
      })
    )
  }
  getAllPlayers() : Observable<any>{
    return this.setToken(this.http, environment.baseUrl, 'get');
  }

  deletePlayer(id: number): Observable<any>{
    return this.setToken(this.http, `${environment.baseUrl}/${id}`, 'delete');
  }

  addPlayer(player: any): Observable<any>{
    return this.setToken(this.http, environment.baseUrl, 'post', player);
   }

   getPlayer(id: number): Observable<any>{
    return this.setToken(this.http, `${environment.baseUrl}/${id}`, 'get');
   }

   updatePlayer(player: any): Observable<any>{
    return this.setToken(this.http, `${environment.baseUrl}/${player.id}`, 'patch', player);
   }

   getPlayersByClub(clubName: any): Observable<any>{
    return this.setToken(this.http, `${environment.baseUrl}/getplayersbyclub/${clubName}`, 'sortBy');

   }
   getPlayersByPosition(positionName: any): Observable<any>{
    return this.setToken(this.http, `${environment.baseUrl}/getplayersbyposition/${positionName}`, 'sortBy');

   }
   getPlayersByNationality(nationalityName: any): Observable<any>{
    return this.setToken(this.http, `${environment.baseUrl}/getplayersbynationality/${nationalityName}`, 'sortBy');

   }

   getToken(): Observable<any>{
    return this.http.get(`${environment.baseUrl}/gettoken`, {responseType: 'text'});
   }
  }


