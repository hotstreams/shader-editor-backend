import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AlertService } from '@app/_services/alert.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Shader } from './models/shader';
import { ShaderProgram } from './models/shaderprogram';

@Injectable({
  providedIn: 'root'
})
export class ShaderService {
  private shader_url = 'http://localhost:8080/shaders/';
  private shader_program_url = 'http://localhost:8080/shaderPrograms/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  constructor(private http : HttpClient) { 
  }

  getShaders() : Observable<Shader[]> {
    return this.http.get<Shader[]>(this.shader_url).pipe(
        tap(_ => console.log('fetched shaders')),
        catchError(this.handleError<Shader[]>('getShaders method failed', []))
      );
  }

  getShader(id: number) : Observable<Shader> {
    return this.http.get<Shader>(`${this.shader_url}${id}`).pipe(
        tap(_ => console.log('fetched shader')),
        catchError(this.handleError<Shader>('getShader method failed'))
      );
  }
  
  addShader(s : Shader) : Observable<Shader> {
    s.id = null;
      // trick; spring data rest is evil!
      s.ShaderProgramID = s.shaderProgramID;

    var body = JSON.stringify(s);

    return this.http.post<Shader>(this.shader_url, body, this.httpOptions)
    .pipe(
      tap((newPoint: Shader) => console.log(`added shader ${s}`)),
      catchError(this.handleError<Shader>('add shader error'))
    );
  }

  putShader(s: Shader) : Observable<Shader> {
    var body = JSON.stringify(s);
    return this.http.put<Shader>(`${this.shader_url}${s.id}`, body, this.httpOptions)
    .pipe(
      tap((newPoint: Shader) => console.log(`put shader ${s}`)),
      catchError(this.handleError<Shader>('put shader error'))
    );
  }

  deleteShader(s: Shader) {
    return this.http.delete<Shader>(`${this.shader_url}${s.id}`, this.httpOptions)
    .pipe(
      tap((newPoint: Shader) => console.log(`delete shader ${s}`)),
      catchError(this.handleError<Shader>('delete shader error'))
    );
  }

  getShaderPrograms() : Observable<ShaderProgram[]> {
    return this.http.get<ShaderProgram[]>(this.shader_program_url).pipe(
        tap(_ => console.log('fetched shaders')),
        catchError(this.handleError<ShaderProgram[]>('getShaders method failed', []))
      );
  }
  
  addShaderProgram(s : ShaderProgram) : Observable<ShaderProgram> {
    var body = JSON.stringify(s);
    return this.http.post<ShaderProgram>(this.shader_program_url, body, this.httpOptions).pipe(
      tap((newPoint: ShaderProgram) => console.log(`added shaderprogram`)),
      catchError(this.handleError<ShaderProgram>('added shaderprogram'))
    );
  }

  deleteShaderProgram(s: ShaderProgram) : Observable<ShaderProgram> {
      return this.http.delete<ShaderProgram>(`${this.shader_program_url}/${s.id}`, this.httpOptions).pipe(
        tap((newPoint: ShaderProgram) => console.log(`delete shaderprogram`)),
        catchError(this.handleError<ShaderProgram>('delete shaderprogram'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      return of(result as T);
    };
  }
}
