import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  output,
  resource,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorLabel } from '../../../../shared/components/form-error-label/form-error-label';
import { Technology } from '../../../interfaces/technologies.interface';
import { firstValueFrom, single, switchMap } from 'rxjs';
import { TechnologyService } from '../../../services/technology.service';
import { ProjectService } from '../../../services/project.service';
import { input } from '@angular/core';
import { Project } from '../../../interfaces/project.interface';

@Component({
  selector: 'app-create-project-modal',
  imports: [FormErrorLabel, ReactiveFormsModule],
  templateUrl: './create-project-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectModal {
  close = output<void>();

  editingProject = input<Project | undefined>(undefined);
  isEditing = signal<boolean>(false);

  fb = inject(FormBuilder);

  isLoading = signal<boolean>(false);
  displayArt = signal<boolean>(false)
  fileVerifier = signal<boolean>(true);
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  technologiesForm = signal<Technology[]>([]);
  selectedTechnologies = signal<number[]>([]);
  userProfileId = localStorage.getItem('profileId')

  _technologyService = inject(TechnologyService);
  _projectService = inject(ProjectService);

  //Traigo las categorías de tecnologías desde el back
  techCategoryResource = resource({
    loader: () => firstValueFrom(this._technologyService.getTechCategories()),
  });

  //Logica para traer las tenologías según la categoría seleccionada
  onFormChanged = effect((onCleanup) => {
    const formCategorySuscription = this.onTechCategoryChanged();

    onCleanup(() => {
      formCategorySuscription.unsubscribe();
    });
  });

  onTechCategoryChanged() {
    return this.projectForm
      .get('technologyCat')!
      .valueChanges.pipe(
        switchMap((category) => this._technologyService.getTechsByCategory(+category!)),
      )
      .subscribe((technologies) => {
        this.technologiesForm.set(technologies);
        console.log(this.technologiesForm());
      });
  }

  //Logica para almacenar las tecnologías seleccionadas
  onClickTechnology(id: number) {
    //Traigo las tecnologías seleccionadas del formulario
    const currentTechnologiesIds = this.projectForm.value.technologyIds ?? [];

    //Si ya esta incluida quitala, sino agregala
    if (currentTechnologiesIds.includes(id)) {
      currentTechnologiesIds.splice(currentTechnologiesIds.indexOf(id), 1);
    } else {
      currentTechnologiesIds.push(id);
    }

    //Actualizo los valores del formulario
    this.projectForm.patchValue({ technologyIds: currentTechnologiesIds });
  }

  //Logica para limpiar technologias del formulario
  cleanTechnologies() {
    this.technologiesForm.set([]);
    this.technologyIds?.setValue([]);
    this.technologyCat?.setValue('');
  }

  //Formulario del modal
  projectForm = this.fb.group({
    projectName: ['', Validators.required],
    descripcion: ['', Validators.required],
    projectURL: [''],
    technologyCat: [''],
    technologyIds: [[] as number[], Validators.required],
  });

  // Relleno el formulario cuando llega editingProject
  fillForm = effect(() => {
    const project = this.editingProject();
    if (!project) return;

    this.isEditing.set(true);
    this.projectForm.patchValue({
      projectName: project.projectName,
      descripcion: project.descripcion,
      technologyIds: project.technologies.map((t) => t.technology.id),
    });
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
    this.projectForm.markAllAsTouched();

    // Verifico si hay archivo al crear
    if (!this.isEditing() && !this.selectedFile()) {
      this.fileVerifier.set(false);
      return;
    }

    if (!this.projectForm.valid) return;

    //Agrego la información a un formData para enviarlo despues al backend
    const formData = new FormData();
    formData.append('projectName', this.projectForm.value.projectName!);
    formData.append('descripcion', this.projectForm.value.descripcion!);
    formData.append('technologyIds', JSON.stringify(this.projectForm.value.technologyIds!));
    formData.append('userProfileId', String(this.userProfileId));

      formData.append('displayArt', String(this.displayArt()));



    //Si projectUrl existe
    if(this.projectForm.value.projectURL && this.projectForm.value.projectURL !== ''){
      formData.append('projectURL', String(this.projectForm.value.projectURL));
    }

    //Si se edito la imagen del proyecto se agrega al formulario
    if (this.selectedFile()) {
      formData.append('file', this.selectedFile()!);
    }

    this.isLoading.set(true);

    console.log('FormData listo para enviar', formData);

    const request$ = this.isEditing()
      ? this._projectService.editProject(this.editingProject()?.id! ,formData)
      : this._projectService.createProject(formData);

    request$.subscribe({
      next: () => {
        this.isLoading.set(false);
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
  get projectURL() {
    return this.projectForm.get('projectURL');
  }
}
