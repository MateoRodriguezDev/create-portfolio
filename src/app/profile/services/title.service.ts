import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviroment';
import { BackendResponse } from '../interfaces/userProfile.interface';
import { Title } from '../interfaces/title.interface';

const baseUrl = environment.baseUrl;


@Injectable({providedIn: 'root'})
export class TitleService {
  constructor() { }

  private http = inject(HttpClient);

  getTitles(): Observable<Title[]> {
      return this.http
        .get<BackendResponse>(`${baseUrl}/titles`)
        .pipe(map(response => response.result));
    }

}
