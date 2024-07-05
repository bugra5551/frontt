import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }


  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.successMessage = 'Giriş başarılı!';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500); // 1.5 saniye sonra ana sayfaya yönlendirme
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Kullanıcı adı veya şifre yanlış';
        this.successMessage = null;
      }
    });
  }
}