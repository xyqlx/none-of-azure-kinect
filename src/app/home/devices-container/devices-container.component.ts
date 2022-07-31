import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { interval, Observable, Subscription } from 'rxjs';
import { AzureKinectService } from '../../shared/services/azure-kinect.service';
import { update } from '../store/devices.action';
import { KinectDevice } from './KinectDevice';


@Component({
  selector: 'app-devices-container',
  templateUrl: './devices-container.component.html',
  styleUrls: ['./devices-container.component.scss'],
})
export class DevicesContainerComponent implements OnInit, OnDestroy {

  constructor(
    private kinectService: AzureKinectService,
    private snackBar: MatSnackBar,
    private translator: TranslateService,
    private store: Store<{devices: KinectDevice[]}>
  ) {
    this.devices$ = store.select('devices');
    this.devices$.subscribe(x => {
      this.devices = x;
    })
  }

  devices$: Observable<KinectDevice[]>;
  private checkDevicesSubscription: Subscription;

  async ngOnInit(): Promise<void> {
    await this.refreshDevices();
    const source = interval(1000);
    this.checkDevicesSubscription = source.subscribe(val => {
      this.refreshDevices();
    });
  }

  public devices: KinectDevice[] = [];

  async refreshDevices() {
    const num = await this.kinectService.getInstalledDevices();
    if(num > this.num){
      this.translator.get('PROMPT.DEVICE_ADD').subscribe(val => {
        this.snackBar.open(val, '', { duration: 2000 });
      });
      for(let i = this.num; i < num; i++){
        const device = await this.kinectService.openByIndex(i);
        this.kinectService.closeBySerialNum(device.serialNum);
        // console.log(device);
        this.store.dispatch(update({devices: [...this.devices, device]}));
      }
      this.num = num;
    }else if(num < this.num){
      this.translator.get('PROMPT.DEVICE_REMOVE').subscribe(val => {
        this.snackBar.open(val, '', { duration: 2000 });
      });
      this.store.dispatch(update({devices: this.devices.slice(0, num)}));
      this.num = num;
    }else{
      const lastDevicesOpenedStatus = this.devices.map(x => x.isOpened);
      const newDevices = await Promise.all(
        this.devices.map(async (x, i)=> 
         new KinectDevice(x.serialNum, x.serialNum === await this.kinectService.getCurrentSerialNum(i))
        )
      );
      const currentDevicesOpenedStatus = newDevices.map(x => x.isOpened);
      if(!lastDevicesOpenedStatus.every((x, i) => x === currentDevicesOpenedStatus[i])){
        this.store.dispatch(update({devices: newDevices}));
      }
    }
  }
  num = 0;

  ngOnDestroy(): void {
    this.checkDevicesSubscription.unsubscribe();
    this.devices.forEach(device => {
      this.kinectService.closeBySerialNum(device.serialNum);
    });
    this.store.dispatch(update({devices: []}));
  }

  // when page beforeunload, close the devices
  @HostListener('window:beforeunload')
  closeDevicesBeforeUnload(event) {
    this.devices.forEach(device => {
      if(device){
        this.kinectService.closeBySerialNum(device.serialNum);
      }
    });
    return true;
  }
}
