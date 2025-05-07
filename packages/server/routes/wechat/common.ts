import CommonRequest from "aprnine-utils/src/request";
import {getKey, setKey} from "../../utils/redis";

export const URL = 'https://api.weixin.qq.com'

export const WeiChatRequest = new CommonRequest({
    baseUrl: URL
})

export const WeiChatConfig = {
    appid: process.env.appId,
    secret: process.env.appSecret
}

export const SESSION_KEY = 'client_credential'
export const getAccessToken = async () => {
    const accessToKen = await getKey(SESSION_KEY)
    if (accessToKen) return accessToKen
    const { access_token, expires_in } = await WeiChatRequest.get('/cgi-bin/token', {
        ...WeiChatConfig,
        grant_type: SESSION_KEY
    })

    await setKey(SESSION_KEY, access_token, expires_in)

    return access_token
}
