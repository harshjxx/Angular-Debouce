import { AfterContentInit, Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceInput]'
})
export class DebounceInputDirective implements AfterContentInit {
  @Output() debouncedValue = new EventEmitter<string>();

  constructor(private elementRef:ElementRef) { }

  ngAfterContentInit(): void {
    fromEvent(this.elementRef.nativeElement, 'input')
    .pipe(
      map((event: any ) => (event.target as HTMLInputElement).value), // Extract the value of the input
      filter((searchValue: string) => searchValue.length > 3), // Only emit if the length is greater than 3
      debounceTime(900), // Wait for 300ms after each keystroke
      distinctUntilChanged() // Only emit if the current value is different from the previous value
    )
    .subscribe((value: string) => {
      this.debouncedValue.emit(value);
    });
  }

}
