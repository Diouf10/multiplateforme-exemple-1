const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('electronAPI', {
  superActionTwoWay: (param) => ipcRenderer.invoke('nom-channel-twoway', param),
  handleAction: (callback) => ipcRenderer.on('nom-channel-handle', callback),
 });


