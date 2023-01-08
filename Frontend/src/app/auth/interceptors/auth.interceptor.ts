import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {CustomToasterService} from '../../utils/custom-toaster.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private toaster: CustomToasterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = this.authService.getToken();
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toaster.showToastMessage('You have been inactive for a long time, please login again.', 5000, 'danger');
          this.authService.logOut()
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
