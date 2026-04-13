import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { UserProfileResponse, BackendResponse, EditProfile } from '../interfaces/userProfile.interface';
import { ProjectService } from './project.service';
import { LinkService } from './link.service';
import { Router } from '@angular/router';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private router = inject(Router)

  actualUserProfileId = signal(-1)

  backgroundURL = signal<string | null>(null)

  editableProfile = signal<EditProfile>({
    userName: '',
    titleId: 0,
    fullName: '',
    profilePictureURL: '',
    backgroundURL: ''
  })

  _projectService = inject(ProjectService)
  _linkService = inject(LinkService)

  getUserProfile(profileId: number): Observable<UserProfileResponse> {
    return this.http
      .get<BackendResponse>(`${baseUrl}/user-profile/fullProfile/${profileId}`)
      .pipe(
        map(response => response.result),
        tap(profile => {
          this.actualUserProfileId.set(Number(localStorage.getItem('profileId')))
          this._projectService.projects.set(profile.projects)
          this._linkService.links.set(profile.links)
          this.backgroundURL.set(profile.backgroundURL)
          this.editableProfile().userName = profile.userName
          this.editableProfile().titleId = profile.title?.id ?? 0
          this.editableProfile().profilePictureURL = profile.profilePictureURL,
          this.editableProfile().backgroundURL = profile.backgroundURL,
          this.editableProfile().fullName = profile.fullName
        }),
        catchError(error => {
        console.error(error);
        this.router.navigate(['/profile/notFound'])
        return throwError(() => new Error(error.message));
      })
      );
  }

  editProfile(formData: any): Observable<EditProfile> {

    const userProfileId = localStorage.getItem('profileId')

    return this.http
      .patch<BackendResponse>(`${baseUrl}/user-profile/${userProfileId}`, formData)
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
