import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { BackendResponse } from '../interfaces/userProfile.interface';
import { Project } from '../interfaces/project.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  projects = signal<Project[]>([]);

  createProject(formData: FormData): Observable<Project> {
    return this.http.post<BackendResponse>(`${baseUrl}/projects`, formData).pipe(
      map((response) => response.result),
      tap((project) => {
        console.log(project);
        this.projects.update((current) => [...current, project]);
      }),
    );
  }

  editProject(projectId: number, formData: any): Observable<Project> {
    return this.http.patch<BackendResponse>(`${baseUrl}/projects/${projectId}`, formData).pipe(
      map((response) => response.result),
      tap((project) => {
        this.projects.update((current) =>
          current.map((proj) => (proj.id === project.id ? project : proj)),
        );
      }),
    );
  }

  deleteProject(id: number): Observable<Project> {
    return this.http.delete<BackendResponse>(`${baseUrl}/projects/${id}`).pipe(
      map((response) => response.result),
      tap((project) => this.projects.set(this.projects().filter((proj) => proj.id !== project.id))),
    );
  }
}
