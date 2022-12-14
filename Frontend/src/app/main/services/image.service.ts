import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {firstValueFrom} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {GenerateImage} from '../models/image.model';

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
    const url = environment.imageApi
    const images = await firstValueFrom(this.http.get<any[]>(url));
    for (let image of images){
      image.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + image.image);
    }
    return images;
  }

  async generateImage(generateImage: GenerateImage) {
    const url = environment.imageApi + '/generate'
    const image = await firstValueFrom(this.http.post<any>(url, generateImage));
    image.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + image.image);
    return image;
  }

  async addRating(imageId: string, rating: number) {
    const url = environment.imageApi + `/rating/${imageId}`
    await firstValueFrom(this.http.post(url, {rating: rating}))
  }

  async getImagesCount() {
    const url = environment.imageApi + '/count'
    const response = await firstValueFrom(this.http.get<{ count: number }>(url));
    return response.count;
  }

  async deleteImage(imageId: string) {
    const url = environment.imageApi + `/${imageId}`
    await firstValueFrom(this.http.delete(url))
  }

  async generateName() {
    const url = environment.imageApi + '/randomName'
    const response = await firstValueFrom(this.http.get<{name: string}>(url));
    return response.name;
  }
}
