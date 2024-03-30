import { AfterViewInit, Component, Directive, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('searchInput') SearchElement!: ElementRef;
  title = 'debounceIt';
  debouncedFromDriective: string ='';
  debouncedFromComponent: string ='';

  ngAfterViewInit(): void {
    fromEvent(this.SearchElement.nativeElement, 'input')
    .pipe(
      map((event: any ) => (event.target as HTMLInputElement).value), // Extract the value of the input
      filter((searchValue: string) => searchValue.length > 3), // Only emit if the length is greater than 3
      debounceTime(900), // Wait for 300ms after each keystroke
      distinctUntilChanged() // Only emit if the current value is different from the previous value
    )
    .subscribe((searchValue: string) => {
      this.debouncedFromComponent = searchValue || "EMPTY STRING";
    });
  }
  testFunction(str: string){
    this.debouncedFromDriective = str || "EMPTY STRING";
  }
}
