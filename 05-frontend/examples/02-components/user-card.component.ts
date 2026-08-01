import { Component, input, output } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div class="card">
      <h2>{{ user().name }}</h2>
      <p>{{ user().email }}</p>
      <button (click)="onDelete()">Delete</button>
    </div>
  `,
  styles: [`
    .card {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `],
})
export class UserCardComponent {
  // Required signal input (Angular 17.1+)
  user = input.required<User>();

  // Output emitting the user's id
  deleted = output<number>();

  onDelete() {
    this.deleted.emit(this.user().id);
  }
}