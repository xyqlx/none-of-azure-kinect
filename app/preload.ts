import { ipcRenderer, contextBridge } from 'electron';


const addAPIs = {
    getInstalledCount: () => {
        return ipcRenderer.invoke('kinect:getInstalledCount');
    },
    openByIndex: (index: number) => {
        return ipcRenderer.invoke('kinect:handleOpenByIndex', index);
    },
    closeBySerialNum: (serialNum: string) => {
        return ipcRenderer.invoke('kinect:handleCloseBySerialNum', serialNum);
    },
    closeByIndex: (index: number) => {
        return ipcRenderer.invoke('kinect:handleCloseByIndex', index);
    },
    getCurrentSerialNum: (index: number) => {
        return ipcRenderer.invoke('kinect:handleGetCurrentSerialNum', index);
    },
    execute: (command: string) => {
        return ipcRenderer.invoke('util:handleExecute', command);
    },
    createFolderIfNotExist: (path: string) => {
        return ipcRenderer.invoke('util:handleCreateFolderIfNotExist', path);
    },
    storeGet: (key: string) => {
        return ipcRenderer.invoke('util:handleStoreGet', key);
    },
    storeSet: (key: string, value: any) => {
        return ipcRenderer.invoke('util:handleStoreSet', key, value);
    },
    storeDelete: (key: string) => {
        return ipcRenderer.invoke('util:handleStoreDelete', key);
    }
};

contextBridge.exposeInMainWorld('electronAPI', addAPIs);
