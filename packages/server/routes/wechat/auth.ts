import express, { Request, Response } from 'express'
import { BadRequest } from "http-errors";
import {successResponse, failureResponse} from "../../utils/response";
// import CommonRequest from "../../../utils/request";
const router = express.Router()

const getWeChatSession = (code: string) => {
    const URL = 'https://api.weixin.qq.com'
    const QuestURL = '/sns/jscode2session'

    // const request = new CommonRequest({ baseUrl: URL })
    // request.get(QuestURL, {})
}

export const login = (req: Request, res: Response) => {
    try {
        const { code } = req.body
        console.log(code)

        if (!code) throw new BadRequest('code未传入')

        console.log(code)
        successResponse(res, '请求成功', {
            code
        })
    } catch (e) {
        console.log(e)
        failureResponse(res, e)
    }
}

router.post('/login', login)

module.exports = router
