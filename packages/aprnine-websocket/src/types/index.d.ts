declare module 'aprnine-websocket' {
    export class MyClient {
        static Instance: MyClient;
        baseUrl: string;
        connect(): Promise<void>;
        callApi<T extends string, U>(api: T, data: U): Promise<any>;
        listenMsg<T>(event: string, callback: (data: T) => void, context: any): Promise<void>;
    }

    export class MyServer<T extends string = string> {
        static connection: string;
        static disconnection: string;
        constructor(options: { port: number });
        on(event: string, callback: () => void): void;
        start(): Promise<boolean>;
        setApi<U = any>(name: T, callback: (connection: any, args: U) => void): void;
    }
} 