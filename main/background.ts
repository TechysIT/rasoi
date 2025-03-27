import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import db from "./helpers/database";
import axios from "axios";
import ipcHandler from "./helpers/ipcHandler";
require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

//  create the main window
(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2] || 8888;
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }

  // Window maximize/restore events
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-status", true);
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-status", false);
  });

  ipcHandler();
  // Maximize/minimize/close window
  ipcMain.on("window-maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("window-minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("window-close", () => {
    app.quit();
  });
})();
app.on("window-all-closed", () => {
  app.quit();
});
