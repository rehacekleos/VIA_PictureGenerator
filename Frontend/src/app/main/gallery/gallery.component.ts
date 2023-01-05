import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';
import {Lightbox} from 'ngx-lightbox';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  isMyGallery = false;
  fakeArray = new Array(16);
  images: any = null;
  private _album: any[] = [];

  constructor(private imageService: ImageService,
              private route: ActivatedRoute,
              private _lightbox: Lightbox) { }

  ngOnInit(): void {

    const path = this.route.snapshot.routeConfig.path
    this.isMyGallery = path == 'my-gallery';

    this.imageService.getImages(this.isMyGallery).then(images => {
      this.images = images
      this._album = images.map(image => {
        return {
          src: image.image,
          caption: image.name
        }
      })
    })
  }

  openLightBox(i: number) {
    this._lightbox.open(this._album, i, {centerVertically: true});
  }
}
