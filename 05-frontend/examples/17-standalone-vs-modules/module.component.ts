// Legacy: NgModule-based (for reference)
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  template: `
    <a [routerLink]="['/users', user.id]">{{ user.name }}</a>
  `,
})
export class UserComponent {
  user = { id: 1, name: 'Alice' };
}

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserComponent],
})
export class UserModule {}

// To use UserComponent, declare it in an NgModule's imports/exports.