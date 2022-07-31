import { IpcMain } from "electron";
import { KinectDevice } from "./KinectDevice";

const KinectAzure = require('kinect-azure');

const openedKinects: {[serialNum: string]: { index: number, serialNum: string, value: any }} = {};

function addKinectHandlerToIPCMain(ipc: IpcMain){
    ipc.handle('kinect:getInstalledCount', handleGetInstalledCount);
    ipc.handle('kinect:handleOpenByIndex', handleOpenByIndex);
    ipc.handle('kinect:handleCloseBySerialNum', handleCloseBySerialNum);
    ipc.handle('kinect:handleCloseByIndex', handleCloseByIndex);
    ipc.handle('kinect:handleGetCurrentSerialNum', handleGetCurrentSerialNum);
}

async function handleGetInstalledCount(event: Electron.IpcMainInvokeEvent) {
    const kinect = new KinectAzure();
    const num = kinect.getInstalledCount();
    return num;
}

async function handleOpenByIndex(event: Electron.IpcMainInvokeEvent, index: number){
    const kinect = new KinectAzure();
    if(kinect.open(index)){
        const serialNum = kinect.getSerialNumber();
        openedKinects[serialNum] = { index, serialNum, value: kinect };
        return new KinectDevice(serialNum, true);
    }else{
        return undefined;
    }
}

async function handleCloseBySerialNum(event: Electron.IpcMainInvokeEvent, serialNum: string){
    const kinect = openedKinects[serialNum];
    if(kinect){
        // console.log('deleteing kinect' + serialNum);
        const isOpen = kinect.value.close();
        if(!isOpen){
            delete openedKinects[kinect.serialNum];
        }
        return isOpen;
    }
    return false;
}

async function handleCloseByIndex(event: Electron.IpcMainInvokeEvent, index: number){
    const kinect = Object.values(openedKinects).find(x=>x.index === index);
    if(kinect){
        // console.log('deleteing kinect' + serialNum);
        const isOpen = kinect.value.close();
        if(!isOpen){
            delete openedKinects[kinect.serialNum];
        }
        return isOpen;
    }
    return false;
}

async function handleGetCurrentSerialNum(event: Electron.IpcMainInvokeEvent, index: number): Promise<string>{
    const kinect = Object.values(openedKinects).find(x=>x.index === index);
    if(kinect){
        return kinect.value.getSerialNumber;
    }
    return "";
}

export { addKinectHandlerToIPCMain };