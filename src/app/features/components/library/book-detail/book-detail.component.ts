import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookStore } from '../../../store/book.store';
import { IBook, IBookForm } from '../../../../core/models/ibook.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponemt } from '../../header/header.componemt';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, HeaderComponemt],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  private router = inject(Router);
  private readonly store = inject(BookStore);
  readonly isLoading = computed(() => this.store.isLoading());
  currentYear = new Date().getFullYear();

  // Property for receiving resolver data
  book = input<IBook | undefined>(undefined);

  isEditMode: boolean = false;
  bookId: number | null = null;

  constructor() {
    effect(() => {
      const bookData = this.book();

      if (bookData) {
        // Edit mode
        this.isEditMode = true;
        this.bookId = bookData.id;
        this.bookForm.patchValue(bookData);
      } else {
        // Add mode
        this.isEditMode = false;
        this.bookId = null;
        this.bookForm.reset({ year: new Date().getFullYear() });
      }
    });
  }

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    year: new FormControl(
      new Date().getFullYear(),
      [Validators.required, Validators.min(1), Validators.max(this.currentYear)],
    ),
    genre: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    // The resolver will not pass 'book'
    if (!this.isEditMode) {
      this.bookForm.reset({ year: new Date().getFullYear() });
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

   const bookData: IBookForm = this.bookForm.getRawValue() as IBookForm;

    if (this.isEditMode && this.bookId !== null) {
      // Edit mode
      this.store.updateBook(this.bookId, bookData);
    } else {
      // Add mode
      this.store.addBook(bookData);
    }

    this.router.navigate(['/library']);
  }

  onCancel(): void {
    this.router.navigate(['/library']);
  }
}
