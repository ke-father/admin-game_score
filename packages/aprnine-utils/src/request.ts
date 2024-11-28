import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

interface ICommonRequestParams {
    baseUrl?: string,
    beforeRequest?: Function,
    afterRequest?: Function
}

type IConfig = Omit<AxiosRequestConfig, 'baseURL'>

export default class CommonRequest {
    // 请求默认地址
    private readonly baseUrl: string = null!
    // 请求前置操作
    private beforeRequest: Function | null = null!
    // 请求后置操作
    private afterRequest: Function | null = null!
    private request: AxiosInstance = null!

    constructor(params: ICommonRequestParams = {}) {
        if (params.baseUrl) this.baseUrl = params.baseUrl
        if (params.beforeRequest) this.beforeRequest = params.beforeRequest
        if (params.afterRequest) this.afterRequest = params.afterRequest

        this.init()
    }

    init () {
        this.request = axios.create({
            baseURL: this.baseUrl
        })

        // 请求拦截器
        this.request.interceptors.request.use(function (config) {
            // console.log('config', config)
            // if (config) throw new Error('错误')
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        })

        // 响应拦截器
        this.request.interceptors.response.use(function (response) {
            // console.log('response', response)
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        })
    }

    // 生成响应格式
    generateResponse (type: 'success' | 'error', { status, data }: AxiosResponse) {
        // const

        const responseMap = {
            success: () => ({
                ...data
            }),
            error: () => ({
                ...data
            })
        }

        return responseMap[type]()
    }

    private async httpRequest (config: IConfig, resolve: Function, reject: Function) {
        try {
            // 发起请求
            const res = await this.request({
                ...config
            })

            resolve(this.generateResponse('success', res))
        } catch (e) {
            reject(this.generateResponse('error', e as AxiosResponse))
        }
    }

    get (url: string, params: object, config: IConfig = {}) {
        const getConfig: IConfig = {
            ...config,
            url,
            params,
            method: 'GET'
        }

        return new Promise( async (resolve, reject) => {
           await this.httpRequest(getConfig, resolve, reject)
        })
    }

    post (url: string, data: object, config: IConfig = {}) {
        const postConfig: IConfig = {
            ...config,
            url,
            data,
            method: 'POST'
        }

        return new Promise(async (resolve, reject) => {
            await this.httpRequest(postConfig, resolve, reject)
        })
    }

    put () {}

    delete () {}
}
