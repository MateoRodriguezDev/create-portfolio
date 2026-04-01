import { inject, Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = inject(Storage);

  getImageUrl(path: string): Promise<string> {
    const imageRef = ref(this.storage, path);
    return getDownloadURL(imageRef);
  }
}