import { Observable } from 'rxjs';
import { IBook, IBookForm } from './ibook.interface';
import { InjectionToken } from '@angular/core';

export interface IBookService {
  getBooks(): Observable<IBook[]>;
  addBook(book: IBookForm | IBook): Observable<IBook>;
  updateBook(id: number, book: IBookForm): Observable<IBook>;
  deleteBook(id: number): Observable<void>;
}

export const IBOOK_SERVICE_TOKEN = new InjectionToken<IBookService>('BookService');