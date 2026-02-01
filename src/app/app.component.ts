import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './core/services/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    this.userService.checkStoredUser();
  }

  logout() {
    this.userService.logout();
  }
}