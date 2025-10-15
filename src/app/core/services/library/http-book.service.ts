import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBookService } from '../../models/ibook-service.interface';
import { Observable } from 'rxjs';
import { IBook, IBookForm } from '../../models/ibook.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpBookService implements IBookService {
  private readonly apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  getBooks(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(this.apiUrl);
  }

  addBook(book: IBookForm): Observable<IBook> {
    return this.httpClient.post<IBook>(this.apiUrl, book);
  }

  updateBook(id: number, book: IBookForm): Observable<IBook> {
    return this.httpClient.put<IBook>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// Switching: In core.providers.ts, change the line
// { provide: IBookService, useClass: HttpBookService }
