import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>
      <h1>My App</h1>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}