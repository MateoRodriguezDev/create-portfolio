import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { UserProfileResponse, BackendResponse } from '../interfaces/userProfile.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  getUserProfile(): Observable<UserProfileResponse> {
    return this.http
      .get<BackendResponse>(`${baseUrl}/user-profile/fullProfile/3`)
      .pipe(map(response => response.result));
  }
}
