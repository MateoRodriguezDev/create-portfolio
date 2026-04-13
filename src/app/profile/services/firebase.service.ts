import { inject, Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = inject(Storage);

  getImageUrl(path: string | null): Promise<string> {

    if(path === null) return Promise.resolve('/assets/images/NoProfile.png')

    if(path === '') return Promise.resolve('/assets/images/NoProfile.png')

    const imageRef = ref(this.storage, path);
    return getDownloadURL(imageRef);
  }
}
