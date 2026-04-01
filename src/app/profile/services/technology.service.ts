import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { BackendResponse } from '../interfaces/userProfile.interface';
import { TechCategory, Technology } from '../interfaces/technologies.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  private http = inject(HttpClient);

  getTechCategories(): Observable<TechCategory[]> {
    return this.http
      .get<BackendResponse>(`${baseUrl}/tech-categories`)
      .pipe(map(response => response.result));
  }

  getTechsByCategory(id: number): Observable<Technology[]> {
    return this.http
      .get<BackendResponse>(`${baseUrl}/technologies/technologyByCat/${id}`)
      .pipe(map(response => response.result));
  }
}

