import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    @if (showNavbar) {
      <app-navbar></app-navbar>
    }
    <main>
      <router-outlet></router-outlet>
    </main>
    @if (showNavbar) {
      <footer class="app-footer">
        <div class="container">
          <p>© {{ year }} EcoMart · Tu marketplace favorito.</p>
        </div>
      </footer>
    }
  `,
  styles: [`
    main { min-height: calc(100vh - 64px - 60px); }
    .app-footer {
      background: #18181b;
      color: #a1a1aa;
      padding: 20px 0;
      text-align: center;
      font-size: 0.9rem;
      margin-top: 40px;
    }
  `]
})
export class AppComponent {
  showNavbar = true;
  year = new Date().getFullYear();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url: string = e.urlAfterRedirects;
        this.showNavbar = !url.startsWith('/login') && !url.startsWith('/register');
      });
  }
}
