import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="courses-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .courses-layout {
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  `]
})
export class CoursesLayoutComponent {}
