/* eslint-disable no-underscore-dangle */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, clipboard } from 'electron';
import fsPromisified from 'fs/promises';
// import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const substanceFile = isDevelopment
  ? path.join('assets', 'database', 'substances.json')
  : path.join(process.resourcesPath, 'assets', 'database', 'substances.json');

// export default class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

let mainWindow: BrowserWindow | null = null;
let isFull = false;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    minWidth: 1020,
    minHeight: 720,
    icon: getAssetPath('AmfoLabs.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: false,
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

ipcMain.handleOnce('close_window', () => {
  if (!mainWindow) return;
  mainWindow.close();
});

ipcMain.handle('fullscreen_window', () => {
  if (!mainWindow) return;
  if (isFull) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
  isFull = !isFull;
});

ipcMain.handle('minimize_window', () => {
  if (!mainWindow) return;
  mainWindow.minimize();
});

ipcMain.handle('get_substances', async () => {
  const data = await fsPromisified.readFile(substanceFile, 'utf8');
  return JSON.parse(data);
});

ipcMain.handle('delete-specific-substance', async (_, args) => {
  const data = await fsPromisified
    .readFile(substanceFile, 'utf8')
    .catch((err) => {
      throw err;
    });
  if (!data) return false;
  if (!args) return false;
  const dataToJson = JSON.parse(data);

  // Find substance by given ID:
  const filteredArray = dataToJson.filter(
    (sub: { _id: { $oid: string } }) => sub._id.$oid !== args._id
  );

  await fsPromisified.writeFile(
    substanceFile,
    JSON.stringify(filteredArray, null, 4),
    'utf8'
  );

  return true;
});

ipcMain.handle('update-specific-substance', async (_, args) => {
  const data = await fsPromisified
    .readFile(substanceFile, 'utf8')
    .catch((err) => {
      throw err;
    });
  if (!data) return false;
  if (!args) return false;
  const dataToJson = JSON.parse(data);

  const formattedData = {
    ...args,
    _id: {
      $oid: args._id,
    },
  };

  // Find substance by given ID:
  const indexOfExistingData = dataToJson.findIndex(
    (sub: { _id: { $oid: string } }) => sub._id.$oid === args._id
  );
  dataToJson[indexOfExistingData] = formattedData;

  await fsPromisified.writeFile(
    substanceFile,
    JSON.stringify(dataToJson, null, 4),
    'utf8'
  );

  return true;
});

ipcMain.handle('add-substance', async (_, args) => {
  const data = await fsPromisified.readFile(substanceFile, 'utf8');
  if (!data) return { message: 'No data on disk', status: false };
  if (!args) return { message: 'No Substance given', status: false };

  const dataToJson = JSON.parse(data);
  const findExistingSubstances = dataToJson.find(
    (substanceFromFile: { name: string; form: string }) =>
      substanceFromFile.name === args.name &&
      substanceFromFile.form === args.form
  );
  if (findExistingSubstances)
    return { message: 'Substance is already registered', status: false };

  const formattedData = {
    ...args,
    _id: {
      $oid: args._id,
    },
  };

  dataToJson.push(formattedData);
  await fsPromisified.writeFile(
    substanceFile,
    JSON.stringify(dataToJson, null, 4),
    'utf8'
  );

  return { message: 'Substance is registered', status: true };
});

ipcMain.handle('copyToClipboard', (_, args: string): boolean => {
  clipboard.writeText(args);
  return true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
