import { from, interval, of } from 'rxjs';
import { map, filter, switchMap, debounceTime, distinctUntilChanged, catchError, retry } from 'rxjs/operators';

// Map and filter
from([1, 2, 3, 4, 5])
  .pipe(
    map((n) => n * 2),
    filter((n) => n > 4)
  )
  .subscribe((n) => console.log('result:', n));

// switchMap: cancel previous inner Observable
const input$ = from(['a', 'b', 'c']);
input$
  .pipe(switchMap((v) => of(`${v}-result`)))
  .subscribe((v) => console.log('switchMap:', v));

// Debounce: wait for pause
const search$ = from(['rea', 'react', 'reacti', 'reactjs']);
search$
  .pipe(debounceTime(300), distinctUntilChanged())
  .subscribe((v) => console.log('search:', v));

// Error handling
of(1, 2, 3)
  .pipe(
    map((n) => {
      if (n === 2) throw new Error('boom');
      return n;
    }),
    catchError((err) => of(-1))
  )
  .subscribe((v) => console.log('error-handled:', v));

// Retry
interval(100)
  .pipe(
    map((n) => {
      if (n === 3) throw new Error('boom');
      return n;
    }),
    retry(2)
  )
  .subscribe({
    next: (v) => console.log('retry:', v),
    error: (err) => console.log('finally error:', err.message),
  });