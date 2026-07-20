export {};

class StateManager { 
    private state:Record<string, any> = {};
    private listeners:Record<string, ((value: any, key: string) => void)[]> = {}; 
    
    public setState(key: string, value: any):void { 
        this.state[key] = value; 
        
        if (this.listeners[key]) { 
            for (const callback of this.listeners[key]) { 
                callback(value, key); 
            } 
        } 
    } 
    
    public getState(key: string):any { 
        return this.state[key]; 
    } 

    public getAllState() {
        return this.state;
    }
    
    public subscribe(key: string, callback: (value: any, key: any) => void):void { 
        if (!this.listeners[key]) { 
            this.listeners[key] = []; 
        } 
        
        this.listeners[key].push(callback); 
    } 
    
    public unsubscribe(key: string, callback: (value: any, key: any) => void):void { 
        if (!this.listeners[key]) { 
            return; 
        } 
        
        this.listeners[key] = this.listeners[key].filter(listener => listener !== callback); 
    } 
}

module.exports = { StateManager };