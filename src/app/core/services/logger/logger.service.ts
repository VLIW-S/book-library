import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string, context?: any): void {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`, context);
  }

  error(message: string, error?: any, context?: any): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error, context); 
  }

  warn(message: string, context?: any): void {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, context);
  }
}
