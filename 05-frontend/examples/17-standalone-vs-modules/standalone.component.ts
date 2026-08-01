// Modern: standalone component (recommended)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a [routerLink]="['/users', user.id]">{{ user.name }}</a>
  `,
})
export class UserComponent {
  user = { id: 1, name: 'Alice' };
}