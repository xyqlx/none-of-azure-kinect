import { KinectDevice } from "../../home/devices-container/KinectDevice"

export interface IElectronAPI {
    getInstalledCount: () => Promise<number>,
    openByIndex: (index: number) => Promise<KinectDevice | undefined>,
    closeBySerialNum: (serialNum: string) => Promise<boolean>,
    closeByIndex: (index: number) => Promise<boolean>,
    execute: (command: string) => Promise<any>,
    createFolderIfNotExist: (path: string) => Promise<any>,
    getCurrentSerialNum: (index: number) => Promise<string>,
    storeGet: (key: string) => Promise<any>,
    storeSet: (key: string, value: any) => Promise<any>,
    storeDelete: (key: string) => Promise<any>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}