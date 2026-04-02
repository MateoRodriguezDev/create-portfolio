import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { CreateLinkModal } from './create-link-modal/create-link-modal';
import { Link } from '../../interfaces/link.interface';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-user-links-techs',
  imports: [CreateLinkModal],
  templateUrl: './user-links-techs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLinksTechs {
  _linkService = inject(LinkService);

  isDeleting = signal<boolean>(false);
  isModalOpen = signal(false);

  links = computed(() => this._linkService.links());


  openModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.isDeleting.set(false)
  }

  changeIsDeleting(boolean: boolean) {
    this.isDeleting.set(boolean);
  }

  deleteProject(id: number) {
    console.log(id)
    this._linkService.deleteLink(id).subscribe({
      next: () => {
        console.log('Link eliminado correctamente');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onLinkClick(event: MouseEvent, link: Link) {
  if (this.isDeleting()) {
    event.preventDefault();
    this.deleteProject(link.id);
  }
}
}
