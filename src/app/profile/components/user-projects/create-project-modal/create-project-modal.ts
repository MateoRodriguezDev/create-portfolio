import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  output,
  resource,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorLabel } from '../../../../shared/components/form-error-label/form-error-label';
import { TechCategory, Technology } from '../../../interfaces/technologies.interface';
import { firstValueFrom, switchMap } from 'rxjs';
import { TechnologyService } from '../../../services/technology.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-create-project-modal',
  imports: [FormErrorLabel, ReactiveFormsModule],
  templateUrl: './create-project-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectModal {

  close = output<void>();

  fb = inject(FormBuilder);

  isLoading = signal<boolean>(false);
  selectedFile = signal<File | null>(null);
  fileVerifier = signal<boolean>(true);
  previewUrl = signal<string | null>(null);
  technologiesForm = signal<Technology[]>([])
  selectedTechnologies = signal<number[]>([])

  _technologyService = inject(TechnologyService);
  _projectService = inject(ProjectService);

  //Traigo las categorías de tecnologías desde el back
  techCategoryResource = resource({
    loader: () => firstValueFrom(this._technologyService.getTechCategories()),
  });

  //Logica para traer las tenologías según la categoría seleccionada
  onFormChanged = effect((onCleanup) => {
    const formCategorySuscription = this.onTechCategoryChanged()

    onCleanup(() => {
      formCategorySuscription.unsubscribe()
    })
  })

  onTechCategoryChanged() {
    return this.projectForm.get('technologyCat')!.valueChanges
    .pipe(
      switchMap(category => this._technologyService.getTechsByCategory(+category!))
    )
    .subscribe(technologies => {
      this.technologiesForm.set(technologies)
      console.log(this.technologiesForm())
    })
  }

  //Logica para almacenar las tecnologías seleccionadas
  onClickTechnology(id: number) {
    //Traigo las tecnologías seleccionadas del formulario
    const currentTechnologiesIds = this.projectForm.value.technologyIds ?? []

    //Si ya esta incluida quitala, sino agregala
    if(currentTechnologiesIds.includes(id)) {
      currentTechnologiesIds.splice(currentTechnologiesIds.indexOf(id), 1)
    } else {
      currentTechnologiesIds.push(id)
    }

    //Actualizo los valores del formulario
    this.projectForm.patchValue({technologyIds: currentTechnologiesIds})
  }

  //Logica para limpiar technologias del formulario
  cleanTechnologies() {
    this.technologiesForm.set([])
    this.technologyIds?.setValue([])
    this.technologyCat?.setValue('')
  }

  //Formulario del modal
  projectForm = this.fb.group({
    projectName: ['', Validators.required],
    descripcion: ['', Validators.required],
    technologyCat: ['', Validators.required],
    technologyIds: [[] as number[], Validators.required],
    userProfileId: [3],
  });


  //Logica para la subida de archivo
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.fileVerifier.set(true)
    this.selectedFile.set(file);

    // Preview
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onSubmit() {

    this.projectForm.markAllAsTouched();

    //Verifico si se puede enviar el submit
    if (!this.selectedFile()) this.fileVerifier.set(false);
    if (!this.projectForm.valid || !this.selectedFile()) return;

    //Agrego la información a un formData para enviarlo despues al backend
    const formData = new FormData();
    formData.append('projectName', this.projectForm.value.projectName!);
    formData.append('descripcion', this.projectForm.value.descripcion!);
    formData.append('technologyIds', JSON.stringify(this.projectForm.value.technologyIds!));
    formData.append('userProfileId', String(this.projectForm.value.userProfileId));
    formData.append('file', this.selectedFile()!);

    this.isLoading.set(true);

    console.log('FormData listo para enviar', formData);
    this._projectService.createProject(formData).subscribe({
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
  get projectName() {
    return this.projectForm.get('projectName');
  }
  get descripcion() {
    return this.projectForm.get('descripcion');
  }
  get technologyCat() {
    return this.projectForm.get('technologyCat');
  }
  get technologyIds() {
    return this.projectForm.get('technologyIds');
  }
}
