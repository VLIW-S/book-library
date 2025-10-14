import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggerService } from '../services/logger/logger.service';
import { NotificationService } from '../services/notification/notification.service';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const logger = inject(LoggerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      
      logger.error(`HTTP Error: ${error.status} ${error.url}`, error);

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        if (error.status === 0) {
            errorMessage = 'Network Error or server is down.';
        } else {
            errorMessage = `Server Error: ${error.status} - ${error.statusText || ''}`;
        }
      }

      notificationService.openSnackBar(errorMessage, 'error');

      // Emit the error for handling in the service/NgRx
      return throwError(() => new Error(errorMessage));
    })
  );
};