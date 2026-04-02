import { inject, Injectable, signal } from '@angular/core';
import { Link } from '../interfaces/link.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { BackendResponse } from '../interfaces/userProfile.interface';
import { environment } from '../../../environments/enviroment';


const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class LinkService {

  private http = inject(HttpClient);

  links = signal<Link[]>([]);

  createLink(link: Link): Observable<Link> {
    return this.http
      .post<BackendResponse>(`${baseUrl}/links`, link)
      .pipe(
        map(response => response.result),
        tap(link => this.links.update(current => [...current, link]))
    );
  }

  deleteLink(id: number): Observable<Link> {
    return this.http
      .delete<BackendResponse>(`${baseUrl}/links/${id}`)
      .pipe(
        map(response => response.result),
        tap(linkResponse => this.links.set(this.links().filter(link => link.id !== linkResponse.id)))
    );
  }

}
