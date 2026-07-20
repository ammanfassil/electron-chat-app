export {};

declare global {
    interface Window {
        api: {
            getState(key: string): Promise<any>;
            setState(key: string, value: any): Promise<void>;
            getAllState(): Promise<Record<string, any>>;
            onStateChanged(
                callback: (
                    key: string,
                    value: any
                ) => void
            ): void;
            onUsername(
                callback: (username: string) => void
            ): void;
        };
    }
}