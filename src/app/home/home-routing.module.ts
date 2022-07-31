import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ShotRecorderComponent } from './shot-recorder/shot-recorder.component';
import { VideoRecorderComponent } from './video-recorder/video-recorder.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'prefix',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'video-recorder',
        pathMatch: 'full'
      },
      {
        path: 'shot-recorder',
        pathMatch: 'prefix',
        component: ShotRecorderComponent,
      },
      {
        path: 'video-recorder',
        pathMatch: 'prefix',
        component: VideoRecorderComponent,
      }
    ]
  },
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
