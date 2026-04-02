import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormErrorLabel } from "../../../../shared/components/form-error-label/form-error-label";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LinkService } from '../../../services/link.service';
import { Link } from '../../../interfaces/link.interface';

@Component({
  selector: 'app-create-link-modal',
  imports: [FormErrorLabel, ReactiveFormsModule],
  templateUrl: './create-link-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLinkModal {

  close = output<void>();

  fb = inject(FormBuilder);

  _linkService = inject(LinkService)

  isLoading = signal<boolean>(false);

    //Formulario del modal
  linkForm = this.fb.group({
    url: ['', Validators.required],
    descripcion: ['', Validators.required],
    userProfileId: [3]
  });

  onSubmit() {

    this.linkForm.markAllAsTouched();

    //Verifico si se puede enviar el submit
    if (!this.linkForm.valid) return;



    this.isLoading.set(true);

    this._linkService.createLink(this.linkForm.value as Link).subscribe({
    next: () => {
      this.isLoading.set(false);
      this.close.emit()

    },
    error: (err) => {
      this.isLoading.set(false)
      console.error(err)
    }
  });

  }

   onClose() {
    this.close.emit();
  }

  //Getters de mi formulario
  get url() {
    return this.linkForm.get('url');
  }
  get descripcion() {
    return this.linkForm.get('descripcion');
  }

}
