import express, { Request, Response } from 'express'
import { BadRequest } from "http-errors";
import {successResponse, failureResponse} from "../../utils/response";
import CommonRequest from "../../../utils/request";

// 获取wechat_session模型
const { wechat_session } = require('../../models')

const router = express.Router()

type IWeChatSession = {
    "openid": string,
    "session_key": string,
    "unionid": string,
    "errcode": number,
    "errmsg": string
}

const getWeChatSession = async (code: string): Promise<IWeChatSession> => {
    try {
        const URL = 'https://api.weixin.qq.com'
        const QuestURL = '/sns/jscode2session'
        const param = {
            appid: process.env.appId,
            secret: process.env.appSecret,
            js_code: code,
            grant_type: 'authorization_code'
        }

        const request = new CommonRequest({ baseUrl: URL })
        const res = await request.get(QuestURL, param)
        console.log(res)

        return res as IWeChatSession
    } catch (e) {
        console.log(e)
        throw e
    }
}

const changeWeChatSession = async (data: IWeChatSession) => {
    // 查找
    const wechatSession = await wechat_session.findOne({
        where: {
            openid: data.openid
        }
    })

    // 已存在内容更新操作
    if (wechatSession) return await wechatSession.update({
        session_key: data.session_key,
        unionid: data.unionid
    })

    // 未存在内容创建操作
    return await wechat_session.create({
        openid: data.openid,
        session_key: data.session_key,
        unionid: data.unionid
    })
}

export const login = async (req: Request, res: Response) => {
    try {
        const { code } = req.body

        if (!code) throw new BadRequest('code未传入')

        let data = await getWeChatSession(code)
        console.log(data)

        if (data.errcode !== 0 && !data.openid) throw new BadRequest('微信登录失败')

        await changeWeChatSession(data)

        successResponse(res, '请求成功', {
            session_key: data.session_key,
            unionid: data.unionid,
            openid: data.openid
        })
    } catch (e) {
        console.log(e)
        failureResponse(res, e)
    }
}

router.post('/login', login)

module.exports = router
