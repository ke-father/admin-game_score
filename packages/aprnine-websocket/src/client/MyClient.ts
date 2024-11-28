import Singleton from 'aprnine-utils/src/Singleton'

interface IItem {
    cb: Function;
    ctx: unknown;
}


export class MyClient extends Singleton {
    static get Instance() {
        return super.GetInstance<MyClient>()
    }

    // 链接地址
    baseUrl: string = null!
    // websocket实例
    ws: WebSocket = null!
// 判断是否链接
    isConnect: boolean = false
    // 发布订阅模式
    private map: Map<string, Array<IItem>> = new Map();

    connect () {
        return new Promise((resolve, reject) => {
            if (this.isConnect) {
                resolve(true)
                return
            }

            this.ws = new WebSocket(`${this.baseUrl}`);
            // this.ws.binaryType = 'arraybuffer'

            this.ws.onopen = () => {
                this.isConnect = true
                resolve(true)
                console.log('连接成功')
            }

            this.ws.onclose = () => {
                this.isConnect = false
                reject(false)
                console.log('连接关闭')
            }

            this.ws.onerror = () => {
                reject(false)
                console.log('连接错误')
            }

            this.ws.onmessage = (event) => {
                try {
                    // 二进制解码
                    const json = JSON.parse(event.data)
                    // const json = binaryDecode(event.data)
                    const { name, data } = json

                    // const ta = new Uint8Array(event.data)
                    // const str = strdeCode(ta)
                    // const json  = JSON.parse(str)
                    // const { name, data } = json

                    // emit触发挂载事件
                    if (this.map.has(name)) {
                        this.map.get(name)?.forEach(({ cb, ctx }) => {
                            cb.apply(ctx, [data])
                        })
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }

    callApi<T = string, U = object> (name: T, data: U) {
        return new Promise(async (resolve, reject) => {
            try {
                let timer = setTimeout(() => {
                    resolve({
                        success: false,
                        error: new Error('TIme out!')
                    })
                    this.unListerMsg(name as any, cb, null)
                }, 5000)

                const cb = (res: any) => {
                    resolve(res)
                    timer && clearTimeout(timer)
                    this.unListerMsg(name as any, cb, null)
                }

                this.listenMsg(name as any, cb, null)
                await this.sendMsg(name as any, data)
            } catch (e) {
                resolve({
                    success: false,
                    error: new Error('TIme out!')
                })
            }
        })
    }

    async sendMsg (name: string, data: any) {
        const msg = {
            name,
            data
        }

        this.ws && this.ws.send(JSON.stringify(msg))

        // 编码 二进制压缩
        // const da = binaryEncode(name, data)
        // this.ws && this.ws.send(da.buffer)
        // // 使用二进制编码压缩数据
        // const str = JSON.stringify(msg)
        // // 转为unit8Array数组
        // const ta = strenCode(str)
        // // 创建ArrayBuffer数组 需要规定长度
        // const ab = new ArrayBuffer(ta.length)
        // // 创建dataView
        // const da = new DataView(ab)
        // // 循环添加每一项
        // for (let index = 0; index < ta.length; index++) {
        //     da.setUint8(index, ta[index])
        // }
        // this.ws && this.ws.send(da.buffer)
    }

    listenMsg (name: string, cb: (args:any) => void, ctx: unknown) {
        if (this.map.has(name)) {
            this.map.get(name)?.push({ cb, ctx })
        } else {
            this.map.set(name, [{ cb, ctx }])
        }
    }

    unListerMsg (name: string, cb: (args: any) => void, ctx: unknown) {
        if (this.map.has(name)) {
            const index = this.map.get(name)?.findIndex((i) => cb === i.cb && i.ctx === ctx) as number;
            index > -1 && this.map.get(name)?.splice(index, 1);
        }
    }
}
