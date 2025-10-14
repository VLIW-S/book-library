import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        provideZonelessChangeDetection(),
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    service = TestBed.inject(NotificationService);
  });

  it('should be created NotificationService', () => {
    expect(service).toBeTruthy();
  });

  it('should open a success snackbar when type is "success"', () => {
    service.openSnackBar('Success!');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Success!',
      'Close',
      jasmine.objectContaining({
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    );
  });

  it('should open an error snackbar when type is "error"', () => {
    service.openSnackBar('Error!', 'error');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Error!',
      'Close',
      jasmine.objectContaining({
        panelClass: ['error-snackbar'],
      })
    );
  });

  it('should open a warning snackbar when type is "warning"', () => {
    service.openSnackBar('Warning!', 'warning');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Warning!',
      'Close',
      jasmine.objectContaining({
        panelClass: ['warning-snackbar'],
      })
    );
  });

  it('should open an info snackbar when type is "info"', () => {
    service.openSnackBar('Info!', 'info');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Info!',
      'Close',
      jasmine.objectContaining({
        panelClass: ['info-snackbar'],
      })
    );
  });
});
