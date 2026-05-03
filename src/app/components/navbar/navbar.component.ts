import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  user = this.auth.user;
  isAuth = this.auth.isAuthenticated;
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.auth.logout();
    this.menuOpen = false;
    this.router.navigate(['/']);
  }
}
