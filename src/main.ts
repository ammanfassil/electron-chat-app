const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');
const { StateManager } = require('./StateManager.js');
let win: typeof BrowserWindow;


console.log("Renderer started");

const state = new StateManager();
state.setState("messages", []);

ipcMain.handle("state:get", (_event: any, key: string) => {
    return state.getState(key);
});

ipcMain.handle("state:get-all", () => {
    return state.getAllState();
});

ipcMain.handle("state:set", (_event: any, key: string, value: any) => {
    console.log("monkey");
    state.setState(key, value);
});

const createWindow = (username: string) => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

    win.webContents.once("did-finish-load", () => {
        win.webContents.send("window:username", username);
    });
	
	win.loadFile('src/renderer.html')  
};


app.whenReady().then(() => {
    createWindow("Amman");
    createWindow("Bob");

    state.subscribe("messages", (value: any) => {
        BrowserWindow.getAllWindows().forEach((window: any) => {
            window.webContents.send(
                "state:changed",
                "messages",
                value
            );
        });
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow("Amman");
            createWindow("Bob");
        }
    });
});