import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  // Send a message to the main process
  send(channel: string, value?: unknown) {
    ipcRenderer.send(channel, value);
  },

  // Listen for a message from the main process
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => {
      callback(...args);
    };

    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },

  // Asynchronously send a message to the main process and get a response
  invoke(channel: string, value?: unknown) {
    try {
      return ipcRenderer.invoke(channel, value);
    } catch (error) {
      console.error(`Error in invoke for channel ${channel}:`, error);
      return null;
    }
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
