import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { IBook, IBookForm } from '../../core/models/ibook.interface';
import { NotificationService } from '../../core/services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IBOOK_SERVICE_TOKEN, IBookService } from '../../core/models/ibook-service.interface';

export interface BookState {
  books: IBook[];
  isLoading: boolean;
  error: string | null;
  filter: string;
}

export const initialState: BookState = {
  books: [],
  isLoading: false,
  error: null,
  filter: '',
};

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ books, filter }) => ({
    bookCount: computed(() => books().length),
    sortedBooks: computed(() => {
      let list = [...books()];
      const filterText = filter().trim().toLowerCase();

      if (filterText) {
        list = list.filter(
          (book) =>
            book.title.toLowerCase().includes(filterText) ||
            book.author.toLowerCase().includes(filterText) ||
            book.genre.toLowerCase().includes(filterText) ||
            book.year.toString().includes(filterText)
        );
      }

      return list.sort((a, b) => a.title.localeCompare(b.title));
    }),
  })),
  withMethods(
    (
      store,
      bookService = inject(IBOOK_SERVICE_TOKEN) as IBookService,
      notificationService = inject(NotificationService)
    ) => ({
      // Updating the filter text
      updateFilter: (filterText: string) => {
        patchState(store, { filter: filterText });
      },
      // Loading all books
      getBooks: () => {
        patchState(store, { isLoading: true, error: null });

        bookService
          .getBooks()
          .pipe(take(1))
          .subscribe({
            next: (books) => {
              patchState(store, { books, isLoading: false });
            },
            error: (err: Error | HttpErrorResponse) => {
              patchState(store, { error: err.message, isLoading: false });
              notificationService.openSnackBar('Failed to load books: ' + err.message, 'error');
            },
          });
      },

      // Adding a book
      addBook: (book: IBook | IBookForm) => {
        patchState(store, { isLoading: true, error: null });

        bookService
          .addBook(book)
          .pipe(take(1))
          .subscribe({
            next: (newBook) => {
              patchState(store, {
                books: [...store.books(), newBook],
                isLoading: false,
              });
              notificationService.openSnackBar(
                `Book "${newBook.title}" added successfully!`,
                'success'
              );
            },
            error: (err: Error | HttpErrorResponse) => {
              patchState(store, { error: err.message, isLoading: false });
              notificationService.openSnackBar('Failed to add book: ' + err.message, 'error');
            },
          });
      },

      // Deleting a book
      deleteBook: (id: number, title: string) => {
        patchState(store, { isLoading: true, error: null });

        bookService
          .deleteBook(id)
          .pipe(take(1))
          .subscribe({
            next: () => {
              patchState(store, {
                books: store.books().filter((b) => b.id !== id),
                isLoading: false,
              });
              notificationService.openSnackBar(`Book "${title}" deleted successfully.`, 'success');
            },
            error: (err: Error | HttpErrorResponse) => {
              patchState(store, { error: err.message, isLoading: false });
              notificationService.openSnackBar('Failed to delete book: ' + err.message, 'error');
            },
          });
      },

      // Updating a book
      updateBook: (id: number, book: IBookForm) => {
        patchState(store, { isLoading: true, error: null });

        bookService
          .updateBook(id, book)
          .pipe(take(1))
          .subscribe({
            next: (updatedBook) => {
              const newBooks = store.books().map((b) => (b.id === id ? updatedBook : b));
              patchState(store, { books: newBooks, isLoading: false });
              notificationService.openSnackBar(
                `Book "${updatedBook.title}" updated successfully.`,
                'success'
              );
            },
            error: (err: Error | HttpErrorResponse) => {
              patchState(store, { error: err.message, isLoading: false });
              notificationService.openSnackBar('Failed to update book: ' + err.message, 'error');
            },
          });
      },
    })
  )
);
