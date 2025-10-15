import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookListComponent } from './book-list.component';
import { BookStore } from '../../../store/book.store';
import { IBook } from '../../../../core/models/ibook.interface';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';

describe('BookListComponent', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let component: BookListComponent;

  let storeSpy: jasmine.SpyObj<InstanceType<typeof BookStore>>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<BookListComponent>>;

   const mockBooks: IBook[] = [
      { id: 1, title: 'Book 1', author: 'Author 1', year: 2020, genre: 'Genre' },
      { id: 2, title: 'Book 2', author: 'Author 2', year: 2021, genre: 'Genre' },
      { id: 3, title: 'Book 3', author: 'Author 3', year: 2022, genre: 'Genre' },
    ];

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj<InstanceType<typeof BookStore>>('BookStore', [
      'getBooks',
      'deleteBook',
      'updateFilter',
      'isLoading',
      'error',
      'bookCount',
      'sortedBooks',
    ]);

    storeSpy.isLoading.and.returnValue(false);
    storeSpy.error.and.returnValue(null);
    storeSpy.bookCount.and.returnValue(mockBooks.length);
    storeSpy.sortedBooks.and.returnValue(mockBooks);

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);

    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: BookStore, useValue: storeSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
  });

  it('should create BookListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBooks() on init', () => {
    component.ngOnInit();
    expect(storeSpy.getBooks).toHaveBeenCalled();
  });

    it('should delete book when user confirms', () => {
    const book = mockBooks[0];
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.deleteBook(book);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(storeSpy.deleteBook).toHaveBeenCalledWith(book.id, book.title);
  });

    it('should not delete book when user cancels', () => {
    const book = mockBooks[0];
    dialogRefSpy.afterClosed.and.returnValue(of(false));
    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.deleteBook(book);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(storeSpy.deleteBook).not.toHaveBeenCalled();
  });

  it('should call store.updateFilter()', () => {
    const input = document.createElement('input');
    input.value = 'Dune';

    const event = new InputEvent('input');
    Object.defineProperty(event, 'target', { value: input });

    component.applyFilter(event);

    expect(storeSpy.updateFilter).toHaveBeenCalledWith('dune');
  });
});

