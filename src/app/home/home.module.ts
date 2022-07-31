import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { VideoRecorderComponent } from './video-recorder/video-recorder.component';
import { ShotRecorderComponent } from './shot-recorder/shot-recorder.component';
import { FunctionItemComponent } from './function-item/function-item.component';
import { FunctionContentsComponent } from './function-contents/function-contents.component';
import { MatDividerModule } from '@angular/material/divider';
import { DevicesContainerComponent } from './devices-container/devices-container.component';
import { DeviceItemComponent } from './devices-container/device-item/device-item.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { devicesReducer } from './store/devices.reducer';
import { MatButtonModule } from '@angular/material/button';
import { CommandLineViewerComponent } from './video-recorder/command-line-viewer/command-line-viewer.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';



@NgModule({
  declarations: [HomeComponent, VideoRecorderComponent, ShotRecorderComponent, FunctionItemComponent, FunctionContentsComponent, DevicesContainerComponent, DeviceItemComponent, CommandLineViewerComponent],
  imports: [
    CommonModule, SharedModule, HomeRoutingModule, FormsModule, ReactiveFormsModule,
    MatInputModule, MatDividerModule, MatSnackBarModule, TextFieldModule, MatSelectModule, MatButtonModule, MatSlideToggleModule, ClipboardModule,
    StoreModule.forRoot({ devices: devicesReducer }),
  ]
})
export class HomeModule { }
