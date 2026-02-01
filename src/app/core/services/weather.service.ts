import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Weather } from '../../models/weather.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/weather`;

  getWeather(city: string = 'London'): Observable<ApiResponse<Weather>> {
    return this.http.get<ApiResponse<Weather>>(`${this.apiUrl}?city=${city}`);
  }
}
