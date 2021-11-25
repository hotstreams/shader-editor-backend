import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
			var parser = new DOMParser();
			var el = parser.parseFromString(err.error, 'application/xhtml+xml');
            const error =  el.getElementsByTagName('body')[0].textContent || err.statusText;
            return throwError(error);
        }))
    }
}