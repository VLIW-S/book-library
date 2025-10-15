import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IBookService } from '../../models/ibook-service.interface';
import { IBook, IBookForm } from '../../models/ibook.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InMemoryBookService implements IBookService {
  private books = signal<IBook[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
      genre: 'Modernist Novel',
    },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian Fiction' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Romance' },
    {
      id: 4,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      year: 1960,
      genre: 'Southern Gothic',
    },
    { id: 5, title: 'Dune', author: 'Frank Herbert', year: 1965, genre: 'Science Fiction' },
    {
      id: 6,
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      year: 1954,
      genre: 'Fantasy',
    },
    { id: 7, title: 'Moby Dick', author: 'Herman Melville', year: 1851, genre: 'Adventure' },
    {
      id: 8,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: 'Douglas Adams',
      year: 1979,
      genre: 'Comedy Sci-Fi',
    },
    { id: 9, title: 'War and Peace', author: 'Leo Tolstoy', year: 1869, genre: 'Historical Novel' },
    {
      id: 10,
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel García Márquez',
      year: 1967,
      genre: 'Magic Realism',
    },
    {
      id: 11,
      title: 'The Little Prince',
      author: 'Antoine de Saint-Exupéry',
      year: 1943,
      genre: 'Fable',
    },
  ]);
  private nextId = Math.max(...this.books().map(b => b.id), 0) + 1;
  private delayMs = environment.apiDelayMs;

  getBooks(): Observable<IBook[]> {
    return of([...this.books()]).pipe(delay(this.delayMs));
  }

  addBook(book: IBookForm): Observable<IBook> {
    const newBook: IBook = { ...book, id: this.nextId++ };
    this.books.set([...this.books(), newBook]);
    return of(newBook).pipe(delay(this.delayMs));
  }

  updateBook(id: number, book: IBookForm): Observable<IBook> {
    const books = this.books();
    const index = books.findIndex((b) => b.id === id);
    if (index > -1) {
      const updatedBooks = [...books];
      const updatedBook: IBook = { ...book, id };
      updatedBooks[index] = updatedBook;
      this.books.set(updatedBooks);
      return of(updatedBook).pipe(delay(this.delayMs));
    }
    return throwError(() => new Error(`Book with id ${id} not found for update`)).pipe(
      delay(this.delayMs)
    );
  }

  deleteBook(id: number): Observable<void> {
    const books = this.books();
    const filteredBooks = books.filter((b) => b.id !== id);
    if (filteredBooks.length === books.length) {
      return throwError(() => new Error(`Book with id ${id} not found for deletion`)).pipe(
        delay(this.delayMs)
      );
    }
    this.books.set(filteredBooks);
    return of(undefined).pipe(delay(this.delayMs));
  }
}
