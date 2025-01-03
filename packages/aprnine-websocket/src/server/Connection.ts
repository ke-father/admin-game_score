import {MyServer} from "./MyServer";
import {WebSocket} from "ws";
import EventEmitter from "stream";

type IItem = {
    cb: Function;
    ctx: unknown;
}

export class Connection<T = string> extends EventEmitter {
    [Key: string]: any
    // 发布订阅模式
    private messageMap: Map<string, Array<IItem>> = new Map();

    constructor(private server: MyServer<T>, private ws: WebSocket) {
        super()

        this.ws.on('close', () => {
            this.emit('close')
        })

        this.ws.on('message', async (buffer: string) => {
            const {name, data } = JSON.parse(buffer)

            try {
                if (this.server.ApiMap.has(name)) {
                    try {
                        const cb = this.server.ApiMap.get(name)
                        const res = await cb!.call(null, this, data)
                        this.sendMsg(name, {
                            success: true,
                            res
                        } as any)
                    } catch (e) {
                        // @ts-ignore
                        this.sendMsg(name, {
                            success: false,
                            error: (e as Error).message
                        })
                    }
                } else {
                    if (this.messageMap.has(name)) {
                        // @ts-ignore
                        for (const {cb, ctx} of this.messageMap.get(name)) {
                            await cb.call(ctx, this, data);
                        }
                    }
                }
            } catch (e) {
                console.log(e)
            }
        })
    }

    sendMsg (name: string, data: object) {
        const msg = {
            name,
            data
        }
        console.log('sendMsg', msg)
        const buffer = JSON.stringify(msg)
        this.ws && this.ws.send(buffer)

        // // 使用二进制编码压缩数据
        // const str = JSON.stringify(msg)
        // // 转为unit8Array数组
        // const ta = strenCode(str)
        // const buffer = Buffer.from(ta)
        // // 传输buffer数据
        // this.ws && this.ws.send(buffer)
    }

    listenMsg (name: string, cb: (connection: Connection<T>, args: any) => void, ctx: unknown) {
        if (this.messageMap.has(name)) {
            // @ts-ignore
            this.messageMap.get(name).push({cb, ctx})
        } else {
            this.messageMap.set(name, [{cb, ctx}])
        }
    }

    unListerMsg (name: string, cb: (connection: Connection<T>, args: any) => void, ctx: unknown) {
        if (this.messageMap.has(name)) {
            // @ts-ignore
            const index = this.messageMap.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            // @ts-ignore
            index > -1 && this.messageMap.get(name).splice(index, 1);
        }
    }
}
