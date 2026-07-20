const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api", {
    getState: (key: string) => {
        return ipcRenderer.invoke("state:get", key);
    },
    setState: (key: string, value: any) => {
        return ipcRenderer.invoke("state:set", key, value);
    }, 
    onStateChanged: (callback: any) => {

        ipcRenderer.on(
            "state:changed",
            (_event: any, key: string, value: any) => {
                callback(key, value);
            }
        );

    },
    getAllState: () => {
        return ipcRenderer.invoke("state:get-all");
    }, 
    onUsername(callback: (username: string) => void) {
        ipcRenderer.on("window:username", (_event: any, username: string) => {
            callback(username);
        });
    }
});