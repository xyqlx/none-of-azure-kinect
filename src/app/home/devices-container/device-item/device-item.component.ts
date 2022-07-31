import { Component, Input, OnInit } from '@angular/core';
import { ElectronUtilService } from '../../../shared/services/electron-util.service';
import { KinectDevice } from '../KinectDevice';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss']
})
export class DeviceItemComponent implements OnInit {

  constructor(
    private electronUtilService: ElectronUtilService
  ) { }

  @Input() deviceIndex: number;
  @Input() device?: KinectDevice;

  ngOnInit(): void {
  }

  openLastVideo(){
    this.electronUtilService.execute('start "' + this.device?.historyVideoPath + '"');
  }

}
