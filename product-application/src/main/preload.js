const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('substances_fetch', {
  ipcRenderer,
});

contextBridge.exposeInMainWorld('app_cycle', {
  ipcRenderer,
});
