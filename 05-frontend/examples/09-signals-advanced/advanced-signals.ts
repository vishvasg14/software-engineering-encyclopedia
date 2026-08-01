import { Component, Injectable, signal, computed, input, output, model } from '@angular/core';

// State container using signals
@Injectable({ providedIn: 'root' })
export class CounterStore {
  private _count = signal(0);
  readonly count = this._count.asReadonly();
  readonly doubled = computed(() => this._count() * 2);

  increment() { this._count.update((n) => n + 1); }
  decrement() { this._count.update((n) => n - 1); }
  reset() { this._count.set(0); }
}

// Component using signal-based inputs/outputs
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ count() }}</span>
    <button (click)="increment()">+</button>

    <input [value]="name()" (input)="onNameInput($event)">

    @if (showMessage()) {
      <p>{{ message() }}</p>
    }
  `,
})
export class CounterComponent {
  // Signal-based input (v17.1+)
  initial = input(0);

  // Two-way model binding
  name = model('');

  // Output emitting events
  countChange = output<number>();

  // Local state
  count = signal(0);
  message = signal('Hello');
  showMessage = signal(true);

  constructor() {
    // Initialize from input
    this.count.set(this.initial());
  }

  increment() {
    this.count.update((n) => n + 1);
    this.countChange.emit(this.count());
  }

  decrement() {
    this.count.update((n) => n - 1);
    this.countChange.emit(this.count());
  }

  onNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }
}