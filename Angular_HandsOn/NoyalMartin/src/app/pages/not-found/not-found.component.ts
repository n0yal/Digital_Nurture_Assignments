import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <a routerLink="/" class="home-link">Go back home</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
    }
    .home-link {
      color: #1a237e;
      text-decoration: none;
      font-weight: 500;
    }
  `]
})
export class NotFoundComponent {}
