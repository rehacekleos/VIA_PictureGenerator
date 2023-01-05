import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {firstValueFrom} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) { }

  getImages(my: boolean){
    if (my){
      return this.getMyImages();
    } else {
      return this.getAllImages()
    }
  }

  async getAllImages() {
    const url = environment.imageApi + '/all'
    const images = await firstValueFrom(this.http.get<any[]>(url));
    for (let image of images){
      image.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + image.image);
    }
    return images;
  }

  async getMyImages() {
    const url = environment.imageApi + '/'
    const images = await firstValueFrom(this.http.get<any[]>(url));
    for (let image of images){
      image.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + image.image);
    }
    return images;
  }

  async generateImage(prompt: string) {
    const url = environment.imageApi + '/generate'
    const image = await firstValueFrom(this.http.post<any>(url, {prompt: prompt}));
    image.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + image.image);
    return image;
  }
}
