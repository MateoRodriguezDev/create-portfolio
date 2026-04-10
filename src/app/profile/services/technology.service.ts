import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { BackendResponse } from '../interfaces/userProfile.interface';
import { TechCategory, Technology, TechnologyElement } from '../interfaces/technologies.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  private http = inject(HttpClient);

  //Para mostrar en la sección de 'I work with'
  totalTechs = signal<TechnologyElement[]>([]);

  updateTotalTechs(techs: TechnologyElement[]) {
    //Almaceno los ids de las technologías que ya estan
    const currentIds = this.totalTechs().map((t) => t.technology.id);

    //Remuevo las techs que tienen la misma id para evitar duplicado
    const newTechs = techs.filter((tech) => !currentIds.includes(tech.technology.id));

    //Actualizo totalTechs
    this.totalTechs.update((current) => [...current, ...newTechs]);

  }

  removeTotalTechs(techs: TechnologyElement[]) {
  const idsToRemove = techs.map(t => t.technology.id);

  this.totalTechs.update(current =>
    current.filter(tech => !idsToRemove.includes(tech.technology.id))
  );
}

  getTechCategories(): Observable<TechCategory[]> {
    return this.http
      .get<BackendResponse>(`${baseUrl}/tech-categories`)
      .pipe(map((response) => response.result));
  }

  getTechsByCategory(id: number): Observable<Technology[]> {
    return this.http
      .get<BackendResponse>(`${baseUrl}/technologies/technologyByCat/${id}`)
      .pipe(map((response) => response.result));
  }
}
