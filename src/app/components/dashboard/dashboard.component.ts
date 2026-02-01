import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Weather } from '../../models/weather.model';
import { UserService } from '../../core/services/user.service';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userService = inject(UserService);
  private weatherService = inject(WeatherService);
  private router = inject(Router);

  weather = signal<Weather | null>(null);
  weatherLoading = signal(false);
  weatherError = signal<string | null>(null);
  cityName = 'London';

  ngOnInit() {
    this.userService.checkStoredUser();
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/auth']);
    }
    this.loadWeather();
  }

  loadWeather() {
    this.weatherLoading.set(true);
    this.weatherError.set(null);

    this.weatherService.getWeather(this.cityName).subscribe({
      next: (response) => {
        this.weather.set(response.data);
        this.weatherLoading.set(false);
      },
      error: (err) => {
        this.weatherError.set('Failed to load weather data');
        this.weatherLoading.set(false);
      }
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }
}