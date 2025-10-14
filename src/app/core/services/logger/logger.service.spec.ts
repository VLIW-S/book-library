import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let logSpy: jasmine.Spy;
  let errorSpy: jasmine.Spy;
  let warnSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService, provideZonelessChangeDetection()],
    });

    service = TestBed.inject(LoggerService);
    logSpy = spyOn(console, 'log');
    errorSpy = spyOn(console, 'error');
    warnSpy = spyOn(console, 'warn');
  });

  it('should create LoggerService', () => {
    expect(service).toBeTruthy();
  });

  it('should [LOG] with message and context', () => {
    const context = { id: 1, author: 'Author' };
    service.log('Book', context);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy.calls.mostRecent().args[0]).toContain('[LOG]');
    expect(logSpy).toHaveBeenCalledWith(jasmine.stringContaining('Book'), context);
  });

  it('should [LOG] without context', () => {
    service.log('Message');
    expect(logSpy).toHaveBeenCalledWith(jasmine.stringContaining('Message'), undefined);
  });

  it('should [ERROR] with message, error and context', () => {
    const error = new Error('Test error');
    const context = { endpoint: '/api/books' };
    service.error('Request error', error, context);
    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy.calls.mostRecent().args[0]).toContain('[ERROR]');
    expect(errorSpy).toHaveBeenCalledWith(
      jasmine.stringContaining('Request error'),
      error,
      context
    );
  });

  it('should [WARN] with message and context', () => {
    const context = { deprecatedApi: '/api/library' };
    service.warn('Warning message', context);
    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy.calls.mostRecent().args[0]).toContain('[WARN]');
    expect(warnSpy).toHaveBeenCalledWith(jasmine.stringContaining('Warning message'), context);
  });

  it('should include ISO timestamp in log', () => {
    service.log('Test');
    const logMessage = logSpy.calls.mostRecent().args[0];
    expect(logMessage).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
