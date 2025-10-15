import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should create PaginationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages correctly', () => {
    expect(component.totalPages()).toBe(2);
  });

  it('should return first page items', () => {
    expect(component.pagedItems()).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return second page items', () => {
    component.currentPage.set(2);
    expect(component.pagedItems()).toEqual([6, 7, 8, 9, 10]);
  });

  it('should go to next page', () => {
    component.nextPage();
    expect(component.currentPage()).toBe(2);
  });

  it('should go to previous page', () => {
    component.currentPage.set(2);
    component.previousPage();
    expect(component.currentPage()).toBe(1);
  });

  it('should not exceed max pages', () => {
    component.currentPage.set(2);
    component.nextPage();
    expect(component.currentPage()).toBe(2);
  });

  it('should not go below page 1', () => {
    component.previousPage();
    expect(component.currentPage()).toBe(1);
  });

  it('should emit pagedItems on change', (done) => {
    component.pageChange.subscribe((items) => {
      expect(items).toEqual([6, 7, 8, 9, 10]);
      done();
    });
    component.currentPage.set(2);
  });
});