import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainComponent} from './main.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../auth/guards/auth.guard';
import {GalleryComponent} from './gallery/gallery.component';
import {GenerateImageComponent} from './generate-image/generate-image.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'my-gallery',
        component: GalleryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'generate',
        component: GenerateImageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
