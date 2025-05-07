import express, {Request, Response} from 'express'
import {BadRequest} from "http-errors";
import {successResponse, failureResponse} from "../../../utils/response";
import CommonRequest from "aprnine-utils/src/request";
import jwt from "jsonwebtoken";
import registerUser from "../../application/register";
import {v4 as uuidv4} from "uuid"
import {getKey, setKey} from "../../../utils/redis";
import {WeiChatConfig, WeiChatRequest} from "../common";

// 获取wechat_session模型
const {Third_party_login} = require('../../../models')

const router = express.Router()

type IWeChatSession = {
    "openid": string,
    "session_key": string,
    "unionid": string,
    "errcode": number,
    "errmsg": string,
    token?: string
}

// 微信登录接口 使用jscode2session 获取openId
const getWeChatSession = async (code: string): Promise<IWeChatSession> => {
    const QuestURL = '/sns/jscode2session'
    const param = {
        js_code: code,
        grant_type: 'authorization_code',
        ...WeiChatConfig
    }

    const res = await WeiChatRequest.get(QuestURL, param)

    return res as IWeChatSession
}

const createWeChatUser = async ({openid, session_key, token}: IWeChatSession) => {
    let user = await getKey(openid)
    console.log('user', user)
    if (!user) {
        // 创建用户
        const account = uuidv4().slice(0, 4)
        const password = uuidv4().slice(0, 8)
        user = await registerUser({
            account,
            role: 1,
            password
        })
        delete user.password

        // 创建第三方登录信息
        await Third_party_login.create({
            user_id: user.id,
            third_party_type: 1,
            third_party_id: openid,
            third_party_token                                                                                                                                                                                                                                                                                                                                                                                                                                                                              : token
        })
    }

    await setKey(openid, {
        ...user,
        session_key
    })

    return user
}

export const login = async (req: Request, res: Response) => {
    try {
        const {code} = req.body

        if (!code) throw new BadRequest('code未传入')

        let data = await getWeChatSession(code)
        // console.log(data)

        if (data.errcode !== 0 && !data.openid) throw new BadRequest('微信登录失败')

        const JWT_SECRET: string = process.env.JWT_SECRET as string

        // 生成token @ts-ignore
        const token = jwt.sign({openid: data.openid}, JWT_SECRET, {
            expiresIn: '2d'
        });
        data.token = token

        // TODO 存储当前用户信息 创建用户
        const user = await createWeChatUser(data)

        successResponse(res, '请求成功', {
            user,
            token,
            session_key: data.session_key
        })
    } catch (e) {
        console.log(e)
        failureResponse(res, e)
    }
}

router.post('/', login)

module.exports = router
