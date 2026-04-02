import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  resource,
  signal,
} from '@angular/core';
import { FormErrorLabel } from '../../../../shared/components/form-error-label/form-error-label';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleService } from '../../../services/title.service';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';
import { EditProfile } from '../../../interfaces/userProfile.interface';

@Component({
  selector: 'app-edit-profile-modal',
  imports: [FormErrorLabel, ReactiveFormsModule],
  templateUrl: './edit-profile-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileModal {
  close = output<void>();
  updated = output<void>();

  _titleService = inject(TitleService);
  _profileService = inject(ProfileService);

  previousProfile = computed(() => this._profileService.editableProfile());

  isLoading = signal<boolean>(false);
  selectedFile = signal<File | null>(null);
  fileVerifier = signal<boolean>(true);
  previewUrl = signal<string | null>(null);

  fb = inject(FormBuilder);

  //Traigo los titulos desde el back
  titleResource = resource({
    loader: () => firstValueFrom(this._titleService.getTitles()),
  });

  //Formulario del modal
  profileForm = this.fb.group({
    fullName: [this.previousProfile().fullName || '', Validators.required],
    userName: [this.previousProfile().userName || '', Validators.required],
    titleId: [this.previousProfile().titleId || 1, [Validators.required, Validators.min(1)]],
    userId: [2],
  });

  //Logica para la subida de archivo
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.fileVerifier.set(true);
    this.selectedFile.set(file);

    // Preview
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.profileForm.markAllAsTouched();

    //Verifico si se puede enviar el submit
    if (!this.profileForm.valid) return;

    //Agrego la información a un formData para enviarlo despues al backend
    const formData = new FormData();
    formData.append('fullName', this.profileForm.value.fullName!);
    formData.append('userName', this.profileForm.value.userName!);
    formData.append('titleId', String(this.profileForm.value.titleId!));
    formData.append('userId', String(this.profileForm.value.userId!));

    //Si se edito la imagen de perfil se agrega al formulario
    if (this.selectedFile()) {
      formData.append('file', this.selectedFile()!);
    }

    this.isLoading.set(true);

    console.log('FormData listo para enviar', formData);
    this._profileService.editProfile(formData).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.updated.emit();
        this.close.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  onClose() {
    this.close.emit();
  }

  //Getters de mi formulario
  get fullName() {
    return this.profileForm.get('fullName');
  }

  get userName() {
    return this.profileForm.get('userName');
  }

  get titleId() {
    return this.profileForm.get('titleId');
  }
}
