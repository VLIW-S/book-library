import { Component, computed, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  items = input.required<any[]>();
  pageSize = input<number>(5);

  pageChange = output<any[]>();

  currentPage = signal(1);
  totalPages = computed(() => {
    const total = this.items().length;
    return total === 0 ? 1 : Math.ceil(total / this.pageSize());
  });

  pagedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.items().slice(start, end);
  });

  constructor() {
    effect(() => {
      this.pageChange.emit(this.pagedItems());
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }
}
