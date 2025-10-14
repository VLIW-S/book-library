import { TestBed } from '@angular/core/testing';
import { InMemoryBookService } from './in-memory-book.service';
import { IBookForm } from '../../models/ibook.interface';
import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom } from 'rxjs';

describe('InMemoryBookService', () => {
  let service: InMemoryBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InMemoryBookService,
        provideZonelessChangeDetection()
      ],
    });

    service = TestBed.inject(InMemoryBookService);
  });

  it('should create InMemoryBookService', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of books', async () => {
    const books = await firstValueFrom(service.getBooks());
    expect(books?.length).toBeGreaterThan(0);
  });

  it('should add a new book', async () => {
    const newBook: IBookForm = {
      title: 'Test Title',
      author: 'Test Author',
      year: 2025,
      genre: 'Test Genre',
    };

    const added = await firstValueFrom(service.addBook(newBook));
    expect(added.title).toBe('Test Title');

    const allBooks = await firstValueFrom(service.getBooks());
    expect(allBooks?.some(b => b.id === added.id)).toBeTrue();
  });

  it('should update a book', async () => {
    const books = await firstValueFrom(service.getBooks());
    const first = books![0];
    const updated = await firstValueFrom(service.updateBook(first.id, {
      title: 'Update Title',
      author: first.author,
      year: first.year,
      genre: first.genre,
    }));

    expect(updated.title).toBe('Update Title');
  });

  it('should throw an error when updating a non-existent book', async () => {
    await expectAsync(firstValueFrom(
      service.updateBook(100, {
        title: 'None',
        author: 'None',
        year: 2000,
        genre: 'None',
      })
    )).toBeRejectedWithError(`Book with id ${100} not found for update`);
  });

  it('should delete a book', async () => {
    const books = await firstValueFrom(service.getBooks());
    const bookToDelete = books![0];
    await firstValueFrom(service.deleteBook(bookToDelete.id));

    const updatedBooks = await firstValueFrom(service.getBooks());
    expect(updatedBooks?.some(b => b.id === bookToDelete.id)).toBeFalse();
  });

  it('should throw an error when deleting a non-existent book', async () => {
    await expectAsync(firstValueFrom(service.deleteBook(100))).toBeRejectedWithError(`Book with id ${100} not found for deletion`);
  });
});
