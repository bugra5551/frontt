import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn: boolean = false;
  userRole: string = '';  // userRole değişkeni burada tanımlandı
  username: string = '';  // username değişkeni burada tanımlandı
  fullName: string = ''; // kullanıcının full name i

  constructor(protected authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userRole = this.authService.getRole();
        this.username = this.authService.getUsername();
        this.fullName = this.authService.getFullname();
      } else {
        this.userRole = '';
        this.username = '';
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  getUserInfo() {
    return this.authService.getRole(); // Örneğin, kullanıcı rolünü gösterebilirsiniz
  }

  openUserInfo() {
    const modalElement = document.getElementById('userInfoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }
}
