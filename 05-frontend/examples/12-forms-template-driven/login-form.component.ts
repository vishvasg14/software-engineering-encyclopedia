import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <div>
        <label>Email</label>
        <input name="email" [(ngModel)]="email" required email>
        @if (f.controls['email']?.touched && f.controls['email']?.invalid) {
          <small>Invalid email</small>
        }
      </div>

      <div>
        <label>Password</label>
        <input name="password" type="password" [(ngModel)]="password" required minlength="8">
        @if (f.controls['password']?.touched && f.controls['password']?.invalid) {
          <small>Password must be at least 8 characters</small>
        }
      </div>

      <button type="submit" [disabled]="f.invalid">Login</button>
    </form>
  `,
})
export class LoginFormComponent {
  email = '';
  password = '';

  onSubmit(form: any) {
    console.log('submit', form.value);
  }
}