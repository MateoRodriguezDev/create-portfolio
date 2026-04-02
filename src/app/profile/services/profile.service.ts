import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { UserProfileResponse, BackendResponse, EditProfile } from '../interfaces/userProfile.interface';
import { ProjectService } from './project.service';
import { LinkService } from './link.service';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  editableProfile = signal<EditProfile>({
    userName: '',
    titleId: 0,
    fullName: '',
    profilePictureURL: ''
  })

  _projectService = inject(ProjectService)
  _linkService = inject(LinkService)

  getUserProfile(): Observable<UserProfileResponse> {
    return this.http
      .get<BackendResponse>(`${baseUrl}/user-profile/fullProfile/3`)
      .pipe(
        map(response => response.result),
        tap(profile => {
          this._projectService.projects.set(profile.projects)
          this._linkService.links.set(profile.links)
          this.editableProfile().userName = profile.userName
          this.editableProfile().titleId = profile.title.id
          this.editableProfile().profilePictureURL = profile.profilePictureURL,
          this.editableProfile().fullName = profile.fullName
        })
      );
  }

  editProfile(formData: any): Observable<EditProfile> {
    return this.http
      .patch<BackendResponse>(`${baseUrl}/user-profile/3`, formData)
      .pipe(
        map(response => response.result),
        tap(profile => {
          this.editableProfile().userName = profile.userName
          this.editableProfile().titleId = profile.titleId
          this.editableProfile().profilePictureURL = profile.profilePictureURL,
          this.editableProfile().fullName = profile.fullName
        })
      );
  }
}
