import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HeaderComponent} from './components/header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from '../auth/auth.module';
import {FormsModule} from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { GenerateImageComponent } from './generate-image/generate-image.component';
import {LightboxModule} from 'ngx-lightbox';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    FooterComponent,
    GalleryComponent,
    GenerateImageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgbModule,
    AuthModule,
    FormsModule,
    LightboxModule,
    NgxSpinnerModule,
  ]
})
export class MainModule { }
