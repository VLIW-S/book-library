import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { IBook } from '../../core/models/ibook.interface';
import { NotificationService } from '../../core/services/notification/notification.service';
import { BookStore } from '../store/book.store';
import { LoggerService } from '../../core/services/logger/logger.service';

export const bookResolver: ResolveFn<IBook | null> = (route, state): Observable<IBook | null> => {
  const id = Number(route.paramMap.get('id'));

  const store = inject(BookStore);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const loggerService = inject(LoggerService);

  if (!id || isNaN(id)) {
    return of(null);
  }

  // Searching for the book in the current state of the store
  const book = store.books().find((b) => b.id === id);

  if (book) {
    return of(book);
  } else {
    if (store.books().length > 0 && !store.isLoading()) {
      notificationService.openSnackBar(`Book with ID ${id} not found in the list.`, 'warning');
      loggerService.warn(`Book with ID ${id} not found in the list.`);
      router.navigate(['/library']);
    }

    // Return null and redirect to the main page
    notificationService.openSnackBar(
      `Book details not available. Please try loading the list again.`,
      'error'
    );
    loggerService.error(`Book details not available. Please try loading the list again.`);
    router.navigate(['/library']);
    return of(null);
  }
};
