import { signal, computed, effect } from '@angular/core';

// Writable signal
const counter = signal(0);
console.log(counter());

counter.set(5);
console.log(counter());

counter.update((n) => n + 1);
console.log(counter());

// Computed signal (lazy, memoized)
const counterDoubled = computed(() => counter() * 2);
console.log(counterDoubled());

counter.set(10);
console.log(counterDoubled()); // recomputes

// Effect: side effect when signal changes
effect(() => {
  console.log('Counter changed:', counter());
});

// Cleanup in effect
effect((onCleanup) => {
  const id = setInterval(() => console.log('tick', counter()), 1000);
  onCleanup(() => clearInterval(id));
});

// untracked: read without tracking
const other = signal(100);
const computedUntracked = computed(() => counter() + untracked(() => other()));