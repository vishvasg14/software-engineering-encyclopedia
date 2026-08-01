import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <input
      [value]="query()"
      (input)="query.set($any($event.target).value)"
      placeholder="Search...">

    @for (result of results(); track result.id) {
      <div>{{ result.name }}</div>
    }
  `,
})
export class SearchComponent {
  private http = inject(HttpClient);

  // Signal as input
  query = signal('');

  // Convert query signal to Observable for RxJS operators
  query$ = toObservable(this.query);

  // Observable -> Signal for HTTP results
  results = toSignal(
    this.query$.pipe(
      debounceTime(300),
      switchMap((q) => this.http.get<Array<{ id: number; name: string }>>(`/api/search?q=${q}`))
    ),
    { initialValue: [] }
  );
}