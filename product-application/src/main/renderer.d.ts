import { IpcRenderer } from 'electron';

export interface IElectronAPI {
  ipcRenderer: IpcRenderer;
}

declare global {
  interface Window {
    app_cycle: IElectronAPI;
    substances_fetch: IElectronAPI;
  }
}
