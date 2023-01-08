import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';
import {Lightbox} from 'ngx-lightbox';
import {ActivatedRoute} from '@angular/router';
import {Image} from '../models/image.model';
import {AuthService} from '../../auth/services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  canRate = true;

  isMyGallery = false;
  fakeArray = new Array(16);
  images: Image[] = null;
  private _album: any[] = [];
  deletedImageName: any;

  constructor(private imageService: ImageService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private _lightbox: Lightbox) { }

  ngOnInit(): void {
    this.authService.$user.subscribe(user => {
      this.canRate = this.authService.getUser() !== null;
    })


    const path = this.route.snapshot.routeConfig.path
    this.isMyGallery = path == 'my-gallery';

    this.getImages();
  }

  getImages(){
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
    this._lightbox.open(this._album, i, {centerVertically: true, showImageNumberLabel: true});
  }

  getRating(item: Image) {
    const sum = item.rating.reduce((a, b) => a + b, 0);
    item.currentRate = (sum / item.rating.length) || 0;
    return item.currentRate;
  }

  async setRating($event: number, item: Image) {
    this.canRate = false;
    await this.imageService.addRating(item.imageId, $event);
    item.rating.push($event);
    this.getRating(item);
    this.canRate = this.authService.getUser() !== null;
  }

  deleteImage(item: Image, content: any) {
    this.deletedImageName = item.name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      async (result) => {
        await this.imageService.deleteImage(item.imageId);
        this.getImages();
      },
      (reason) => {
      },
    );
  }
}
