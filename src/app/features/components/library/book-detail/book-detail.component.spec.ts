import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BookStore } from '../../../store/book.store';
import { IBook } from '../../../../core/models/ibook.interface';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storeSpy: jasmine.SpyObj<InstanceType<typeof BookStore>>;

  const mockBook: IBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    year: 2020,
    genre: 'Test Genre',
  };

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('BookStore', [
      'addBook',
      'updateBook',
    ], {
      isLoading: jasmine.createSpy('isLoading').and.returnValue(false),
    });

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [BookDetailComponent, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: BookStore, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create BookDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with current year', () => {
    expect(component.bookForm.get('year')?.value).toBe(new Date().getFullYear());
  });

  it('should be in add mode when no book provided', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.bookId).toBeNull();
  });

  it('should enter edit mode when book input provided', () => {
    fixture.componentRef.setInput('book', mockBook);
    fixture.detectChanges();
    expect(component.isEditMode).toBeTrue();
    expect(component.bookId).toBe(mockBook.id);
  });

  it('should initialize form with book data in edit mode', () => {
    fixture.componentRef.setInput('book', mockBook);
    fixture.detectChanges();
    
    expect(component.bookForm.get('title')?.value).toBe(mockBook.title);
    expect(component.bookForm.get('author')?.value).toBe(mockBook.author);
    expect(component.bookForm.get('year')?.value).toBe(mockBook.year);
    expect(component.bookForm.get('genre')?.value).toBe(mockBook.genre);
  });

  it('should call store.addBook() onSubmit', () => {
    fixture.detectChanges();
    component.bookForm.patchValue({
      title: 'New Book',
      author: 'New Author',
      year: 2025,
      genre: 'New Genre',
    });

    component.onSubmit();

    expect(storeSpy.addBook).toHaveBeenCalledWith({
      title: 'New Book',
      author: 'New Author',
      year: 2025,
      genre: 'New Genre',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/library']);
  });

  it('should call store.updateBook() onSubmit', () => {
    fixture.componentRef.setInput('book', mockBook);
    fixture.detectChanges();
    
    component.bookForm.patchValue({ title: 'Updated Title' });
    component.onSubmit();

    expect(storeSpy.updateBook).toHaveBeenCalledWith(mockBook.id, jasmine.objectContaining({
      title: 'Updated Title',
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/library']);
  });

  it('should not submit invalid form', () => {
    fixture.detectChanges();
    component.bookForm.patchValue({ title: '', author: 'Author' });

    component.onSubmit();

    expect(storeSpy.addBook).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to library onCancel', () => {
    component.onCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/library']);
  });
});