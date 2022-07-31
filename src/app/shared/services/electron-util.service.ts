import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronUtilService {
  private window: Window;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }
  async execute(command: string): Promise<any> {
    return await this.window.electronAPI.execute(command);
  }
  async createFolderIfNotExist(path: string): Promise<any> {
    return await this.window.electronAPI.createFolderIfNotExist(path);
  }
  async storeGet(key: string): Promise<any> {
    return await this.window.electronAPI.storeGet(key);
  }
  async storeSet(key: string, value: any): Promise<any> {
    return await this.window.electronAPI.storeSet(key, value);
  }
  async storeDelete(key: string): Promise<any> {
    return await this.window.electronAPI.storeDelete(key);
  }
}
