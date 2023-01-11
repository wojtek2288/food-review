import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../main/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar) {
    }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addHeaders(httpRequest)).pipe(catchError((error: HttpErrorResponse) => {
            if (error && error.status === 401) {
                this.snackBar.open("Your session has expired. Please log in again", "", { duration: 3000 });
                this.authService.logout();
            }
            return new Observable<HttpEvent<any>>()
        }));
    }

    addHeaders(request: HttpRequest<any>) {
        if(request.headers.get('content-type'))
        {
            return request;
        }
        let headers = {
            'Content-Type': 'application/json'
        };
        if (this.authService.loggedInUser) {
            headers = Object.assign({
                Authorization: `Bearer ${this.authService.loggedInUser.access_token}`
            }, headers);
        }
        return request.clone({
            setHeaders: headers
        })
    }
}