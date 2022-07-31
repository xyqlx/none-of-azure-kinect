import { IpcMain } from "electron";
import { exec } from 'child_process';
import * as Store from 'electron-store';
const store = new Store();

function addUtilHandlerToIPCMain(ipc: IpcMain) {
    ipc.handle('util:handleExecute', handleExecute);
    ipc.handle('util:handleCreateFolderIfNotExist', handleCreateFolderIfNotExist);
    ipc.handle('util:handleStoreGet', handleStoreGet);
    ipc.handle('util:handleStoreSet', handleStoreSet);
    ipc.handle('util:handleStoreDelete', handleStoreDelete);
}

async function handleExecute(event: Electron.IpcMainInvokeEvent, command: string) {
    const cmd = exec(command);

    cmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    cmd.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    cmd.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

async function handleCreateFolderIfNotExist(event: Electron.IpcMainInvokeEvent, path: string) {
    const cmd = exec('mkdir -p "' + path + '"');

    cmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    cmd.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    cmd.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

async function handleStoreGet(event: Electron.IpcMainInvokeEvent, key: string) {
    const value = store.get(key);
    // console.log(`get ${JSON.stringify(value)}`)
    return value;
}
async function handleStoreSet(event: Electron.IpcMainInvokeEvent, key: string, value: any) {
    // console.log(`saved ${JSON.stringify(value)}`)
    store.set(key, value);
}
async function handleStoreDelete(event: Electron.IpcMainInvokeEvent, key: string) {
    store.delete(key);
}

export { addUtilHandlerToIPCMain };