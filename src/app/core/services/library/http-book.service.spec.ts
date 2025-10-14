import { TestBed } from '@angular/core/testing';
import { HttpBookService } from './http-book.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IBook, IBookForm } from '../../models/ibook.interface';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalErrorInterceptor } from '../../interceptors/global-error.interceptor';
import { environment } from '../../../environments/environment';

describe('HttpBookService', () => {
  let service: HttpBookService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        HttpBookService,
        provideHttpClient(withInterceptors([globalErrorInterceptor])),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });

    service = TestBed.inject(HttpBookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create HttpBookService', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET on getBooks()', () => {
    const mockBooks: IBook[] = [
      { id: 1, title: 'Book 1', author: 'Author', year: 2020, genre: 'Genre' },
      { id: 2, title: 'Book 2', author: 'Author', year: 2021, genre: 'Genre' },
    ];

    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should call POST on addBook()', () => {
    const form: IBookForm = { title: 'New Book', author: 'Author', year: 2025, genre: 'Genre' };
    const newBook: IBook = { id: 123, ...form };

    service.addBook(form).subscribe((book) => {
      expect(book).toEqual(newBook);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(form);
    req.flush(newBook);
  });

  it('should call PUT on updateBook()', () => {
    const id = 5;
    const form: IBookForm = { title: 'Updated Book', author: 'Author', year: 2024, genre: 'Genre' };
    const updatedBook: IBook = { id, ...form };

    service.updateBook(id, form).subscribe((book) => {
      expect(book).toEqual(updatedBook);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(form);
    req.flush(updatedBook);
  });

  it('should call DELETE on deleteBook()', () => {
    const id = 10;

    service.deleteBook(id).subscribe((response) => {
      expect(response == null).toBeTrue();
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
