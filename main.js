'use strict';
// import {Menu, MenuItem, dialog, ipcMain} from 'electron';
// import {appMenuTemplate} from './src/component/menu';

const electron = require('electron');

// Module to control application life.
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const appMenuTemplate = require('./src/menu').appMenuTemplate;

const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

let safeExit = false;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    const menu = Menu.buildFromTemplate(appMenuTemplate);

    menu.items[0].submenu.append(new MenuItem({
        label: "Open image file",
        click() {
            mainWindow.webContents.send('action', 'open'); //点击后向主页渲染进程发送“打开图片文件”的命令
        },
        accelerator: 'CmdOrCtrl+O' //快捷键：Ctrl+O
    }));

    menu.items[0].submenu.append(new MenuItem({
        label: "Open ljson",
        click() {
            mainWindow.webContents.send('action', 'open_ljson'); //点击后向主页渲染进程发送“打开ljson文件”的命令
        },
        accelerator: 'CmdOrCtrl+Alt+O' //快捷键：Ctrl+Alt+O
    }));

    menu.items[0].submenu.append(new MenuItem({
        label: "Save",
        click() {
            mainWindow.webContents.send('action', 'save'); //点击后向主页渲染进程发送“保存文件”的命令
        },
        accelerator: 'CmdOrCtrl+S' //快捷键：Ctrl+S
    }));
    //添加一个分隔符
    menu.items[0].submenu.append(new MenuItem({
        type: 'separator'
    }));

    menu.items[0].submenu.append(new MenuItem({
        role: 'quit'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Prev",
        click() {
            mainWindow.webContents.send('action', 'prev');
        },
        accelerator: 'Left'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Prev10",
        click() {
            mainWindow.webContents.send('action', 'prev10');
        },
        accelerator: 'CmdOrCtrl+Left'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Prev100",
        click() {
            mainWindow.webContents.send('action', 'prev100');
        },
        accelerator: 'Shift+Left'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Next",
        click() {
            mainWindow.webContents.send('action', 'next');
        },
        accelerator: 'Right'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Next10",
        click() {
            mainWindow.webContents.send('action', 'next10');
        },
        accelerator: 'CmdOrCtrl+Right'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Next100",
        click() {
            mainWindow.webContents.send('action', 'next100');
        },
        accelerator: 'Shift+Right'
    }));

    menu.items[1].submenu.append(new MenuItem({
        type: 'separator'
    }));

    menu.items[1].submenu.append(new MenuItem({
        label: "Correct",
        click() {
            mainWindow.webContents.send('action', 'correct');
        },
        accelerator: 'Enter'
    }));

    Menu.setApplicationMenu(menu);

    mainWindow.on('close', (e) => {
        if (!safeExit) {
            e.preventDefault();
            mainWindow.webContents.send('action', 'exiting');
        }
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('reqaction', (event, arg) => {
    switch (arg) {
        case 'exit':
            //做点其它操作：比如记录窗口大小、位置等，下次启动时自动使用这些设置；不过因为这里（主进程）无法访问localStorage，这些数据需要使用其它的方式来保存和加载，这里就不作演示了。这里推荐一个相关的工具类库，可以使用它在主进程中保存加载配置数据：https://github.com/sindresorhus/electron-store
            //...
            safeExit = true;
            app.quit();//退出程序
            break;
    }
});
