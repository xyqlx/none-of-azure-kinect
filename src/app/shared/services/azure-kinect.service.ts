import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { KinectDevice } from '../../home/devices-container/KinectDevice';

@Injectable({
  providedIn: 'root',
})
export class AzureKinectService {
  private window: Window;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }
  async getInstalledDevices(): Promise<number> {
    return await this.window.electronAPI.getInstalledCount();
  }
  async openByIndex(index: number): Promise<KinectDevice | undefined> {
    return await this.window.electronAPI.openByIndex(index);
  }
  async closeBySerialNum(serialNum: string): Promise<boolean> {
    return await this.window.electronAPI.closeBySerialNum(serialNum);
  }
  async closeByIndex(index: number): Promise<boolean> {
    return await this.window.electronAPI.closeByIndex(index);
  }
  async getCurrentSerialNum(index: number): Promise<string> {
    return await this.window.electronAPI.getCurrentSerialNum(index);
  }
}
