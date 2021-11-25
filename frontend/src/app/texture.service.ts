import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { texture } from './models/texture';

@Injectable({
  providedIn: 'root'
})
export class TextureService {
  private texture_url = 'http://localhost:8080/textures/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { 
  }

  getTextures() : Observable<texture[]> {
    return this.http.get<texture[]>(this.texture_url).pipe(
        tap(_ => console.log('fetched textures')),
        catchError(this.handleError<texture[]>('getTextures method failed', []))
      );
  }

  getSPT(url: string) : Observable<texture[]>{
    return this.http.get<texture[]>(url).pipe(
            tap(_ => console.log('fetched textures')),
            catchError(this.handleError<texture[]>('getTextures method failed', []))
          );
  }


  
  addTexture(s : texture) : Observable<texture> {
    s.id = null;
    let body = JSON.stringify(s);

    return this.http.post<texture>(this.texture_url, body, this.httpOptions)
    .pipe(
      tap((newPoint: texture) => console.log(`added point`)),
      catchError(this.handleError<texture>('check point'))
    );
  }

   putTexture(s: texture) : Observable<texture> {
    var body = JSON.stringify(s);

    console.log(body);

    return this.http.patch<texture>(`${this.texture_url}${s.id}`, body, this.httpOptions)
    .pipe(
      tap((newPoint: texture) => console.log(`put tex`)),
      catchError(this.handleError<texture>('put tex error'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      return of(result as T);
    };
  }
}
