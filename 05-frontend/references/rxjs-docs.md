# RxJS Documentation Reference

The authoritative source for RxJS is the official documentation. This file catalogs the RxJS documentation pages referenced in the Frontend document.

## Primary documentation

- **RxJS Documentation:** <https://rxjs.dev/>
- **RxJS API Reference:** <https://rxjs.dev/api>
- **RxJS GitHub:** <https://github.com/ReactiveX/rxjs>
- **ReactiveX (cross-language):** <http://reactivex.io/>

## Documentation structure

| Section | What it covers |
|---------|---------------|
| **Getting Started** | Installation, first stream |
| **Concepts** | Observable, Observer, Operator, Subject, Scheduler |
| **Reference** | All operators, schedulers, types |
| **Guides** | Patterns, migration, testing |
| **Recipes** | Common patterns |

## Concepts

| Concept | URL |
|---------|-----|
| Observable | <https://rxjs.dev/guide/observable> |
| Observer | <https://rxjs.dev/guide/observer> |
| Operators | <https://rxjs.dev/guide/operators> |
| Subscription | <https://rxjs.dev/guide/subscription> |
| Subject | <https://rxjs.dev/guide/subject> |
| Schedulers | <https://rxjs.dev/guide/scheduler> |

## Operator categories

### Creation operators <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Creation%20operators'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Creation operators" title="Ask ChatGPT about this section">💬</a>

| Operator | Purpose |
|----------|---------|
| `of` | Emit a sequence of values |
| `from` | Convert Promise, array, iterable, or Object to Observable |
| `fromEvent` | Convert DOM event to Observable |
| `interval` | Emit values at intervals |
| `timer` | Emit after delay |
| `range` | Emit a range of numbers |
| `defer` | Lazy creation |
| `generate` | Like a `for` loop |
| `empty` | Complete without emitting |
| `throwError` | Error immediately |
| `never` | Never emits or completes |

### Transformation operators <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Transformation%20operators'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Transformation operators" title="Ask ChatGPT about this section">💬</a>

| Operator | Purpose |
|----------|---------|
| `map` | Transform each value |
| `mapTo` | Map to constant |
| `pluck` | Pick property |
| `mergeMap` | Flatten with concurrency |
| `switchMap` | Flatten, cancel previous inner |
| `concatMap` | Flatten, queue inner |
| `exhaustMap` | Flatten, ignore new inner while active |
| `scan` | Accumulate values |
| `reduce` | Combine all into one |
| `buffer` | Collect until trigger |
| `bufferTime` | Collect over time |
| `bufferCount` | Collect N at a time |
| `groupBy` | Group by key |
| `partition` | Split by predicate |
| `toArray` | Collect into array on complete |

### Filtering operators <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Filtering%20operators'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Filtering operators" title="Ask ChatGPT about this section">💬</a>

| Operator | Purpose |
|----------|---------|
| `filter` | Pass matching values |
| `first` / `last` | First/last matching value |
| `take` | Take N values |
| `takeWhile` | Take until predicate fails |
| `takeUntil` | Take until notifier emits |
| `skip` | Skip N values |
| `skipWhile` / `skipUntil` | Conditional skip |
| `distinct` | Distinct values |
| `distinctUntilChanged` | Distinct from previous |
| `distinctUntilKeyChanged` | Distinct on key |
| `debounce` / `debounceTime` | Wait for pause |
| `throttle` / `throttleTime` | Limit rate |
| `audit` / `auditTime` | Emit last in window |
| `sample` / `sampleTime` | Emit latest in window |
| `ignoreElements` | Drop values |
| `elementAt` | Nth element |
| `single` | Single value or error |
| `find` / `findIndex` | First match |

### Combination operators <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Combination%20operators'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Combination operators" title="Ask ChatGPT about this section">💬</a>

| Operator | Purpose |
|----------|---------|
| `combineLatest` | Latest from all inputs |
| `combineLatestWith` | Latest with two inputs |
| `zip` | Pair values from N inputs |
| `forkJoin` | Wait for all to complete |
| `merge` | Interleave emissions |
| `mergeWith` | Merge with two inputs |
| `concat` | Sequential |
| `concatWith` | Concat with two inputs |
| `race` | First to emit wins |
| `startWith` | Emit initial values |
| `endWith` | Emit final values |
| `pairwise` | Current and previous |
| `withLatestFrom` | Combine with second source |

### Error handling operators <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Error%20handling%20operators'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Error handling operators" title="Ask ChatGPT about this section">💬</a>

| Operator | Purpose |
|----------|---------|
| `catchError` | Recover from error |
| `retry` | Retry on error |
| `retryWhen` | Retry with condition |
| `retryUntil` | Retry until condition |
| `retryConfig` (with delay) | Configurable retry |

### Multicasting operators <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Multicasting%20operators'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Multicasting operators" title="Ask ChatGPT about this section">💬</a>

| Operator | Purpose |
|----------|---------|
| `share` | Multicast with refCount |
| `shareReplay` | Multicast with replay buffer |
| `publish` | Multicast via connect |
| `publishBehavior`, `publishLast`, `publishReplay` | Variants |

### Utility operators <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Explain%20'Utility%20operators'%20in%20detail%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know." target="_blank" rel="noopener" data-askgpt="Utility operators" title="Ask ChatGPT about this section">💬</a>

| Operator | Purpose |
|----------|---------|
| `tap` | Side effect without modification |
| `delay` | Delay emissions |
| `delayWhen` | Conditional delay |
| `dematerialize` | Unwrap notifications |
| `materialize` | Wrap values in notifications |
| `observeOn` | Set scheduler |
| `subscribeOn` | Set subscription scheduler |
| `timeInterval` | Time between emissions |
| `timestamp` | Add timestamp |
| `timeout` | Error on timeout |
| `timeoutWith` | Fallback on timeout |
| `toAsyncScheduler` | Convert sync to async |

## Subject types

| Subject | Behavior |
|---------|---------|
| `Subject` | Multicasts; no initial value; subscribers get only future emissions |
| `BehaviorSubject` | Multicasts; has current value; new subscribers get latest |
| `ReplaySubject` | Multicasts; buffers N values; new subscribers get buffer |
| `AsyncSubject` | Multicasts; only emits last value on complete |
| `VoidSubject` | Type-safe subject (no values) |

## Schedulers

| Scheduler | Use case |
|-----------|----------|
| `asyncScheduler` | Schedules as microtasks (queueMicrotask) |
| `asapScheduler` | Schedules as microtasks (browser-setImmediate fallback) |
| `animationFrameScheduler` | requestAnimationFrame |
| `queueScheduler` | Sync (queue) |
| `animationFrame` | Same as animationFrameScheduler |

## Multicasting

- **Unicast:** Each subscription gets its own execution.
- **Multicast:** All subscriptions share one execution.
- `share()`, `shareReplay()` for multicast.

## Testing RxJS

- **Marble testing:** Use `TestScheduler` with marble diagrams.
- `cold()` and `hot()` for creating test observables.
- `expectObservable()`, `expectSubscriptions()`.

## Books

- *RxJS in Action* — Paul P. Daniels, Luis Atencio (Manning).
- *Reactive Programming with RxJS 7* — Sergi Mansilla (Leanpub).
- *Mastering Reactive JavaScript* — Erich de Souza (Packt).

## Community

- **Discord:** ReactiveX community.
- **GitHub Discussions:** <https://github.com/ReactiveX/rxjs/discussions>
- **Stack Overflow:** <https://stackoverflow.com/questions/tagged/rxjs>