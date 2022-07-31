import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as path from 'path';
import { interval, Observable, Subscription } from 'rxjs';
import { AzureKinectService } from '../../shared/services/azure-kinect.service';
import { ElectronUtilService } from '../../shared/services/electron-util.service';
import { TtsService } from '../../shared/services/tts.service';
import { KinectDevice } from '../devices-container/KinectDevice';
import { update } from '../store/devices.action';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<{ devices: KinectDevice[] }>,
    private formBuilder: FormBuilder,
    private electronUtilService: ElectronUtilService,
    private snackBar: MatSnackBar,
    private translator: TranslateService,
    private azureKinectService: AzureKinectService,
    private cdr: ChangeDetectorRef,
    private tts: TtsService
  ) {
    this.devices$ = this.store.select('devices');
    this.devices$.subscribe(x => {
      const option = this.formOptions.value;
      const lastSelectedMasterDevice = option.selectedMasterDevice;
      this.devices = x;
      if (this.devices.length > 0 && !option.selectedMasterDevice) {
        this.formOptions.patchValue({
          selectedMasterDevice: this.devices[0]
        });
      }
      if (lastSelectedMasterDevice) {
        const newSelectedMasterDevice = this.devices.find(x => x.serialNum === lastSelectedMasterDevice?.serialNum);
        if (newSelectedMasterDevice) {
          this.formOptions.patchValue({
            selectedMasterDevice: newSelectedMasterDevice
          });
        }
      }
      const delays = this.formOptions.get('delay') as FormArray;
      delays.clear();
      this.devices.forEach(x => {
        const delay = this.createdelayForm();
        delay.reset({ depthDelay: 0, syncDelay: 0 });
        delays.push(delay);
      });
    });
  }
  ngOnDestroy(): void {
    this.updateCommandlineSubscription.unsubscribe();
  }

  createdelayForm() {
    return this.formBuilder.group({
      depthDelay: [],
      syncDelay: [],
    });
  }
  private devices$: Observable<KinectDevice[]>;
  devices: KinectDevice[] = [];
  formOptions = this.formBuilder.group({
    'selectedMasterDevice': new FormControl(),
    'imu': new FormControl(true),
    'selectedColorMode': new FormControl(),
    'selectedFPS': new FormControl(),
    'exposureControl': new FormControl(),
    'selectedDepthMode': new FormControl(),
    'delay': this.formBuilder.array([this.createdelayForm()]),
    'recordSeconds': new FormControl(),
    'outputFolder': new FormControl('')
  });

  recommandedRecordSeconds: number[] = [5, 10, 20, 30, 60, 120];
  availableColorMode: string[] = ['3072p', '2160p', '1536p', '1440p', '1080p', '720p', '720p_NV12', '720p_YUY2', 'OFF'];
  availableFPS: string[] = ['5', '15', '30'];
  availableDepthMode: string[] = ['NFOV_2X2BINNED', 'NFOV_UNBINNED', 'WFOV_2X2BINNED', 'WFOV_UNBINNED', 'PASSIVE_IR', 'OFF'];

  commandLines: string[] = [];
  private updateCommandlineSubscription: Subscription;

  async ngOnInit(): Promise<void> {
    const savedFormValue = await this.electronUtilService.storeGet('video-recorder');
    // console.log(JSON.stringify(savedFormValue));
    if (savedFormValue) {
      this.formOptions.patchValue(savedFormValue);
    } else {
      this.formOptions.patchValue({
        'selectedColorMode': '1080p',
        'selectedFPS': '30',
        'exposureControl': 'auto',
        'selectedDepthMode': 'NFOV_UNBINNED',
        'recordSeconds': '30',
      });
    }
    this.onFormChange();
    this.formOptions.valueChanges.subscribe(x => {
      this.onFormChange();
    });

    // this.onFormChange();
    const source = interval(1000);
    this.updateCommandlineSubscription = source.subscribe(x => {
      this.onFormChange();
    });
  }

  lastTimeString = '';
  onFormChange() {
    const option = this.formOptions.value;
    //console.log(JSON.stringify(option));
    if (this.devices.length === 0) {
      return;
    }
    if (option.delay.length < this.devices.length) {
      return;
    }
    this.electronUtilService.storeSet('video-recorder', {
      'selectedColorMode': option.selectedColorMode,
      'selectedFPS': option.selectedFPS,
      'selectedDepthMode': option.selectedDepthMode,
      'exposureControl': option.exposureControl,
      'recordSeconds': option.recordSeconds,
      'outputFolder': option.outputFolder,
    });
    const commandLines = [];
    const exposureControlPart = option.exposureControl === 'auto' ? '' : `--exposure-control ${option.exposureControl}`;
    this.lastTimeString = this.timestring;
    if (this.devices.length === 1) {
      if (this.devices[0]) {
        commandLines.push(`"C:\\Program Files\\Azure Kinect SDK v1.4.1\\tools\\k4arecorder.exe" --device 0 --external-sync Standalone --record-length ${option.recordSeconds} --color-mode ${option.selectedColorMode} --depth-mode ${option.selectedDepthMode} --depth-delay ${(option.delay[0] as any).depthDelay} --rate ${option.selectedFPS} --imu ${option.imu ? 'ON' : 'OFF'} ${exposureControlPart} ${option.outputFolder}\\${this.lastTimeString}\\${this.devices[0].serialNum}.mkv`);
      }
      else {
        commandLines.push('');
      }
    }
    else {
      this.devices.forEach((device, i) => {
        if (device && device === option.selectedMasterDevice) {
          commandLines.push(`"C:\\Program Files\\Azure Kinect SDK v1.4.1\\tools\\k4arecorder.exe" --device ${i} --external-sync Master --record-length ${option.recordSeconds} --color-mode ${option.selectedColorMode} --depth-mode ${option.selectedDepthMode} --depth-delay ${(option.delay[i] as any).depthDelay} --rate ${option.selectedFPS} --imu ${option.imu ? 'ON' : 'OFF'} ${exposureControlPart} ${option.outputFolder}\\${this.lastTimeString}\\${device.serialNum}.mkv`);
        } else if (device) {
          commandLines.push(`"C:\\Program Files\\Azure Kinect SDK v1.4.1\\tools\\k4arecorder.exe" --device ${i} --external-sync Subordinate --record-length ${option.recordSeconds} --color-mode ${option.selectedColorMode} --depth-mode ${option.selectedDepthMode} --depth-delay ${(option.delay[i] as any).depthDelay} --sync-delay ${(option.delay[i] as any).syncDelay} --rate ${option.selectedFPS} --imu ${option.imu ? 'ON' : 'OFF'} ${exposureControlPart} ${option.outputFolder}\\${this.lastTimeString}\\${device.serialNum}.mkv`);
        } else {
          commandLines.push('');
        }
      });
    }
    this.commandLines = commandLines;
  }

  get masterDeviceIndex(): number {
    const option = this.formOptions.value;
    return this.devices.indexOf(option.selectedMasterDevice);
  }

  isMaster(index: number) {
    return this.masterDeviceIndex === index;
  }

  pad2(n) { return n < 10 ? '0' + n : n }

  get timestring() {
    const date = new Date();
    return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds());
  }

  async startRecord() {
    this.translator.get('PROMPT.START_RECORDING').subscribe(x => {
      this.snackBar.open(x, '', { duration: 2000 });
    });
    const timestring = this.lastTimeString;
    const commandLines = [...this.commandLines];
    this.electronUtilService.createFolderIfNotExist(path.join(this.formOptions.value.outputFolder, timestring));
    let tasks = [];
    tasks = commandLines.map((x, i) => async () => {
      if (i !== this.masterDeviceIndex) {
        if (await this.azureKinectService.getCurrentSerialNum(i) === this.devices[i].serialNum) {
          // device open
          this.azureKinectService.closeBySerialNum(this.devices[i].serialNum);
          // sleep to wait for the device to close
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        await this.electronUtilService.execute('start cmd.exe /K ' + x);
      }
    });
    tasks.push(
      async () => {
        if (await this.azureKinectService.getCurrentSerialNum(this.masterDeviceIndex) === this.devices[this.masterDeviceIndex].serialNum) {
          // device open
          this.azureKinectService.closeBySerialNum(this.devices[this.masterDeviceIndex].serialNum);
          // sleep to wait for the device to close
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        await this.electronUtilService.execute('start cmd.exe /K ' + commandLines[this.masterDeviceIndex]);
      }
    );
    // start tasks
    for (let i = 0; i < tasks.length; i++) {
      await tasks[i]();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.tts.countdown(this.formOptions.value.recordSeconds);
    this.store.dispatch(update({
      devices: this.devices.map(
        x => new KinectDevice(x.serialNum, x.isOpened, path.join(this.formOptions.value.outputFolder, timestring, x.serialNum + '.mkv')))
    }));
  }
}
