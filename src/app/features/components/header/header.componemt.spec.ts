import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponemt } from './header.componemt';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';

describe('HeaderComponemt (signals only, zoneless)', () => {
  let fixture: ComponentFixture<HeaderComponemt>;
  let component: HeaderComponemt;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponemt],
      providers: [provideZonelessChangeDetection(), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponemt);
    component = fixture.componentInstance;
  });

  it('should create HeaderComponemt', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input signals', () => {
    expect(component.actionLink()).toBeNull();
    expect(component.actionLabel()).toBeNull();
  });

  it('should accept input signals', () => {
    fixture.componentRef.setInput('title', 'Library Header');
    fixture.componentRef.setInput('actionLink', ['/books']);
    fixture.componentRef.setInput('actionLabel', 'Add Book');

    expect(component.title()).toBe('Library Header');
    expect(component.actionLink()).toEqual(['/books']);
    expect(component.actionLabel()).toBe('Add Book');
  });
});

