import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'אירעה שגיאה לא צפויה';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `שגיאת לקוח: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'בקשה לא תקינה';
              break;
            case 401:
              errorMessage = 'אין הרשאה לבצע פעולה זו';
              break;
            case 404:
              errorMessage = 'המשאב המבוקש לא נמצא';
              break;
            case 500:
              errorMessage = 'שגיאת שרת פנימית';
              break;
            default:
              errorMessage = `שגיאה ${error.status}: ${error.message}`;
          }
        }

        this.snackBar.open(errorMessage, 'סגור', {
          duration: 5000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        });

        return throwError(() => error);
      }),
    );
  }
}
