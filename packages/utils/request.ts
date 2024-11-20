import * as process from "process";
import path from "path";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'

// 配置环境变量
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

interface ICommonRequestParams {
    baseUrl?: string,
    beforeRequest?: Function,
    afterRequest?: Function
}

type IConfig = Omit<AxiosRequestConfig, 'baseURL'>

class CommonRequest {
    // 请求默认地址
    private baseUrl = process.env.BASE_URL
    // 请求前置操作
    private beforeRequest: Function | null = null
    // 请求后置操作
    private afterRequest: Function | null = null
    private requset: AxiosInstance = null!

    constructor(params: ICommonRequestParams = {}) {
        if (params.baseUrl) this.baseUrl = params.baseUrl
        if (params.beforeRequest) this.beforeRequest = params.beforeRequest
        if (params.afterRequest) this.afterRequest = params.afterRequest

        this.init()
    }

    init () {
        this.requset = axios.create({
            baseURL: this.baseUrl
        })
    }

    private async httpRequest (config: IConfig, resolve: Function, reject: Function) {
        try {
            console.log(this.requset    )
            // 发起请求
            const res = await this.requset({
                ...config
            })

            console.log(res)

            resolve(res)
        } catch (e) {
            console.log(e, 1111)
            reject(e)
        }
    }

    get (config: IConfig) {
        return new Promise( async (resolve, reject) => {
           await this.httpRequest(config, resolve, reject)
        })
    }

    post (url: string, data: object, config: IConfig = {}) {
        const postConfig: IConfig = {
            ...config,
            url,
            data,
            method: 'POST'
        }

        console.log(postConfig)

        return new Promise(async (resolve, reject) => {
            await this.httpRequest(postConfig, resolve, reject)
        })
    }

    put () {}

    delete () {}
}

const request = new CommonRequest()
request.post('/wechat/login', {
    code: 110
}, {
    url: '/login',
}).then((res: any) => {
    console.log(res)
})
export default CommonRequest
