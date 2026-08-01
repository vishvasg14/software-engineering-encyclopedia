import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: `
    <h1>{{ greeting() }}</h1>

    <input
      [value]="name()"
      (input)="onNameChange($event)"
      placeholder="Your name">

    <button (click)="onClick()">Click me</button>

    @if (count() > 0) {
      <p>Clicked {{ count() }} times</p>
    } @else {
      <p>Click the button!</p>
    }

    @for (item of items(); track item.id) {
      <li>{{ item.name }}</li>
    } @empty {
      <li>No items</li>
    }
  `,
})
export class GreetingComponent {
  name = signal('World');
  count = signal(0);
  greeting = computed(() => `Hello, ${this.name()}!`);

  items = signal([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]);

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }

  onClick() {
    this.count.update((n) => n + 1);
  }
}