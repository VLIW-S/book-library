# BookLibrary

Project demonstrates modern best practices with **standalone components**, **signals**, **zoneless change detection support** and a lightweight **state management store** built with `@ngrx/signals`.

## Project Structure

src/app/core/: Contains core application logic like:

- interfaces (models/);
- services (services/library/, services/logger, services/notification);
- interceptors (interceptors/).

src/app/features/: Groups files by application feature:

- containing components (components/) (library/book-list/, library/book-detail/, header/, pagination/, confirm-dialog/ );
- routing (routes/);
- data preparation (resolvers/);
- state management (store/).

src/app/styles/: Files containing styles that affect the entire application, imported into the main application stylesheet (src/styles.scss).

## State Management

BookStore is a centralized state management store for the Book Library app using NgRx Signals.

**Example Usage**

```bash
- Update filter
bookStore.updateFilter('dune');

- Load books
bookStore.getBooks();

- Add a new book
bookStore.addBook({ title: 'New Book', author: 'Author', year: 2025, genre: 'Fiction' });

- Delete a book
bookStore.deleteBook(5, 'Dune');

- Update a book
bookStore.updateBook(2, { title: '1984 Updated', author: 'George Orwell', year: 1949, genre: 'Dystopian' });
```

## Notifications

NotificationService wraps Angular Material SnackBar.

**Example Usage**

```bash
notificationService.openSnackBar('Book deleted', 'success');
```

It supports success, error, warning, and info types with auto-dismiss after 3 seconds.

## Logger

LoggerService provides centralized logging to the console with timestamps.
Supports levels: log, warn, and error.

**Example Usage**

```
loggerService.error('Failed to delete book', new Error('Network error'), { bookId: 10 });
```

Supports levels: log, warn, and error.

## Interceptors

httpErrorInterceptor is an Angular HTTP interceptor that catches HTTP errors, logs them using a custom LoggerService, and transforms them into user-friendly error messages. It works with both client-side and server-side errors and can be used in services or state management (e.g., NgRx) for error handling.

## Resolvers

bookResolver is an Angular route resolver that fetches a book by ID before navigating to a route. It integrates with a reactive BookStore.

## Development Setup

- Angular CLI 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

**Example Usage**

```bash
it('should throw an error when updating a non-existent book', async () => {
  await expectAsync(firstValueFrom(
    service.updateBook(100, {
      title: 'None',
      author: 'None',
      year: 2000,
      genre: 'None',
    })
  )).toBeRejectedWithError('Book with id 100 not found for update');
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
