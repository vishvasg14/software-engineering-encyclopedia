import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" placeholder="Email">
      <input formControlName="password" type="password" placeholder="Password">

      <div formArrayName="phones">
        @for (phone of phones.controls; track $index; let i = $index) {
          <div [formGroupName]="i">
            <input formControlName="type" placeholder="Type">
            <input formControlName="number" placeholder="Number">
          </div>
        }
      </div>

      <button type="button" (click)="addPhone()">Add phone</button>
      <button type="submit" [disabled]="form.invalid">Register</button>
    </form>

    <pre>{{ form.value | json }}</pre>
  `,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phones: this.fb.array([]),
  });

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(
      this.fb.group({
        type: [''],
        number: [''],
      })
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('submit', this.form.value);
    }
  }
}