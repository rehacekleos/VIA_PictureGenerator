import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {GenerateImage} from '../models/image.model';

@Component({
  selector: 'app-generate-image',
  templateUrl: './generate-image.component.html',
  styleUrls: ['./generate-image.component.scss']
})
export class GenerateImageComponent implements OnInit {

  generateImage: GenerateImage = {
    name: '',
    prompt: ''
  }
  image: any

  generating = true;
  constructor(private imageService: ImageService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.generateImage = {
      name: '',
      prompt: ''
    }
  }

  async generate() {
    await this.spinner.show()
    try {
      this.image = await this.imageService.generateImage(this.generateImage)
    } catch (e) {
      await this.spinner.hide()
    }
    await this.spinner.hide()
  }
}
