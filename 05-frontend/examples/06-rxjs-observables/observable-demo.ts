import { Observable, of, from, interval, Subject, BehaviorSubject } from 'rxjs';

// of: emit a set of values
const nums$ = of(1, 2, 3);
nums$.subscribe((n) => console.log('of:', n));

// from: convert array or Promise to Observable
const arr$ = from(['a', 'b', 'c']);
arr$.subscribe((s) => console.log('from:', s));

// interval: emit at intervals
const tick$ = interval(1000);
const sub = tick$.subscribe((n) => console.log('tick:', n));
setTimeout(() => sub.unsubscribe(), 5500); // unsubscribe after 5 ticks

// Subject: multicast, no initial value
const subject = new Subject<string>();
subject.subscribe((v) => console.log('A:', v));
subject.subscribe((v) => console.log('B:', v));
subject.next('hello');
subject.next('world');

// BehaviorSubject: has current value, new subscribers get latest
const behavior = new BehaviorSubject<number>(0);
behavior.subscribe((v) => console.log('current:', v));
behavior.next(1);
behavior.next(2);