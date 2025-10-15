import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookStore } from '../../../store/book.store';
import { IBook, IBookForm } from '../../../../core/models/ibook.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponemt } from '../../header/header.componemt';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    HeaderComponemt,
    PaginationComponent,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  private dialog = inject(MatDialog);
  private readonly store = inject(BookStore);

  readonly isLoading = computed(() => this.store.isLoading());
  readonly error = computed(() => this.store.error());
  readonly bookCount = computed(() => this.store.bookCount());
  readonly sortedBooks = computed(() => this.store.sortedBooks());

  dataSource = new MatTableDataSource<IBookForm>();
  displayedColumns: string[] = ['title', 'author', 'year', 'genre', 'actions'];

  ngOnInit(): void {
    // Load data on initialization
    this.store.getBooks();
  }

  deleteBook(book: IBook): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: book.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.deleteBook(book.id, book.title);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.store.updateFilter(filterValue.trim().toLowerCase());
  }

  onPageChange(books: IBook[]) {
    this.dataSource.data = books;
  }
}
