import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent, DialogData } from './confirm-dialog.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let component: ConfirmDialogComponent;

  
  const mockData: DialogData = { title: 'The Great Gatsby' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create ConfirmDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data via MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual(mockData);
    expect(component.data.title).toBe('The Great Gatsby');
  });

  it('should display the title in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('The Great Gatsby');
  });
});
