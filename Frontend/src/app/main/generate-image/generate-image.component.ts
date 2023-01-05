import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-generate-image',
  templateUrl: './generate-image.component.html',
  styleUrls: ['./generate-image.component.scss']
})
export class GenerateImageComponent implements OnInit {

  prompt: string
  image: any
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  async generate() {
    this.image = await this.imageService.generateImage(this.prompt)
  }
}
