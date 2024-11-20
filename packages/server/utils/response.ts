import { Response } from 'express'
import createHttpError from 'http-errors'

// 成功响应
export interface ISuccessResponse <T = object> {
    (res: Response, message: string, data?: T, code?: 200 | number): void
}

// 失败响应
export interface IFailureResponse {
    (res: Response, error: any, message?: string): void
}

/**
 * 请求成功
 * @param res 响应参数
 * @param message 响应信息
 * @param data 数据
 * @param code 状态码
 */
export const successResponse: ISuccessResponse = (res, message, data = {}, code = 200) => {
    res.status(code as number)
        .json({
            status: true,
            message,
            data
        })
}

/**
 * 请求失败
 * @param res
 * @param error
 * @param message
 */
export const failureResponse: IFailureResponse = (res, error, message = '服务器错误') => {
    try {
        const setBody: (status: number, message: string, errors: string[]) => void = (status, message, errors) => {
            res.status(status)
                .json({
                    status: false,
                    message,
                    errors: Array.isArray(errors) ? errors : [errors]
                })
        }

        const errorMap = new Map([
            // 验证错误
            ['SequelizeValidationError', () => setBody(400, '请求参数错误', error.errors.map((e: any) => e.message))],
            ['JsonWebTokenError', () => setBody(401, '认证失败', ['您提交的token错误'])],
            ['TokenExpiredError', () => setBody(401, '认证失败', ['您提交的token已过期'])],
            ['MulterError', () => setBody(413, '上传文件大小超出限制', ['上传文件过大'])],
            ['default', () => setBody(500, message, [error.message])],
        ])

        if (error instanceof createHttpError.HttpError) setBody(error.status, '请求失败', [error.message])
        else {
            const errorObject = errorMap.get(error.name)
            if (errorObject) errorObject()
            else (errorMap.get('default') as Function)()
        }
    } catch (e) {
        console.log(e)
    }
}
