import { REINTENTOS } from './var.constant';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {
    }

    //https://github.com/angular/material2/issues/7470
    //https://www.academind.com/learn/javascript/rxjs-6-what-changed/
    //https://stackoverflow.com/questions/50475213/rxjs-6-new-version-of-httpinterceptor
    //https://stackoverflow.com/questions/48030197/what-is-pipe-function-in-angular-2
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(REINTENTOS)).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
                    }*/
                }
            })).pipe(catchError((err) => {
                console.log(err);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 401) {
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 500', { duration: 5000 });
                } else {
                    this.snackBar.open(err.error.mensaje, 'ERROR', { duration: 5000 });
                }
                return EMPTY;
            }));
    }
}