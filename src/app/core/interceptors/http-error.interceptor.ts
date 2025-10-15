import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggerService } from '../services/logger/logger.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggerService = inject(LoggerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      
      loggerService.error(`HTTP Error: ${error.status} ${error.url}`, error);

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        if (error.status === 0) {
            errorMessage = 'Network Error or server is down.';
        } else {
            errorMessage = `Server Error: ${error.status} - ${error.statusText || ''}`;
        }
      }

      // Emit the error for handling in the service/NgRx
      return throwError(() => new Error(errorMessage));
    })
  );
};