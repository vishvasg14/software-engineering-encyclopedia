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

### Creation operators

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23creation-operators%0A%0ASection%20title%3A%20Creation%20operators' target='_blank' rel='noopener' data-askgpt='Creation operators' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/05-frontend/references/rxjs-docs.md#creation-operators' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23creation-operators%0A%0ASection%20title%3A%20Creation%20operators' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23creation-operators%0A%0ASection%20title%3A%20Creation%20operators' title='Ask ChatGPT about this section'>💬</a>
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

### Transformation operators

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23transformation-operators%0A%0ASection%20title%3A%20Transformation%20operators' target='_blank' rel='noopener' data-askgpt='Transformation operators' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/05-frontend/references/rxjs-docs.md#transformation-operators' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23transformation-operators%0A%0ASection%20title%3A%20Transformation%20operators' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23transformation-operators%0A%0ASection%20title%3A%20Transformation%20operators' title='Ask ChatGPT about this section'>💬</a>
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

### Filtering operators

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23filtering-operators%0A%0ASection%20title%3A%20Filtering%20operators' target='_blank' rel='noopener' data-askgpt='Filtering operators' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/05-frontend/references/rxjs-docs.md#filtering-operators' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23filtering-operators%0A%0ASection%20title%3A%20Filtering%20operators' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23filtering-operators%0A%0ASection%20title%3A%20Filtering%20operators' title='Ask ChatGPT about this section'>💬</a>
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

### Combination operators

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23combination-operators%0A%0ASection%20title%3A%20Combination%20operators' target='_blank' rel='noopener' data-askgpt='Combination operators' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/05-frontend/references/rxjs-docs.md#combination-operators' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23combination-operators%0A%0ASection%20title%3A%20Combination%20operators' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23combination-operators%0A%0ASection%20title%3A%20Combination%20operators' title='Ask ChatGPT about this section'>💬</a>
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

### Error handling operators

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23error-handling-operators%0A%0ASection%20title%3A%20Error%20handling%20operators' target='_blank' rel='noopener' data-askgpt='Error handling operators' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/05-frontend/references/rxjs-docs.md#error-handling-operators' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23error-handling-operators%0A%0ASection%20title%3A%20Error%20handling%20operators' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23error-handling-operators%0A%0ASection%20title%3A%20Error%20handling%20operators' title='Ask ChatGPT about this section'>💬</a>
| Operator | Purpose |
|----------|---------|
| `catchError` | Recover from error |
| `retry` | Retry on error |
| `retryWhen` | Retry with condition |
| `retryUntil` | Retry until condition |
| `retryConfig` (with delay) | Configurable retry |

### Multicasting operators

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23multicasting-operators%0A%0ASection%20title%3A%20Multicasting%20operators' target='_blank' rel='noopener' data-askgpt='Multicasting operators' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/05-frontend/references/rxjs-docs.md#multicasting-operators' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23multicasting-operators%0A%0ASection%20title%3A%20Multicasting%20operators' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23multicasting-operators%0A%0ASection%20title%3A%20Multicasting%20operators' title='Ask ChatGPT about this section'>💬</a>
| Operator | Purpose |
|----------|---------|
| `share` | Multicast with refCount |
| `shareReplay` | Multicast with replay buffer |
| `publish` | Multicast via connect |
| `publishBehavior`, `publishLast`, `publishReplay` | Variants |

### Utility operators

 <a class='askgpt-btn' href='https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23utility-operators%0A%0ASection%20title%3A%20Utility%20operators' target='_blank' rel='noopener' data-askgpt='Utility operators' data-askgpt-url='https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/05-frontend/references/rxjs-docs.md#utility-operators' data-askgpt-prompt-depth='Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23utility-operators%0A%0ASection%20title%3A%20Utility%20operators' data-askgpt-prompt-examples='Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F05-frontend%2Freferences%2Frxjs-docs.md%23utility-operators%0A%0ASection%20title%3A%20Utility%20operators' title='Ask ChatGPT about this section'>💬</a>
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