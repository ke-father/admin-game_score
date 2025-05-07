import express from "express";
import {failureResponse, successResponse} from "../../../utils/response";
import {getAccessToken, WeiChatRequest} from "../common";
const router = express.Router()
const wechatOpenid = require('../../../middlewares/wechat-openid')

const verifySession = async (req, res) => {
    const accessTokenRes = await getAccessToken()
    await WeiChatRequest.get('/wxa/checksession', {
        access_token: accessTokenRes,
        openid: req.openid,

    })

}

router.get('/', wechatOpenid, async (req, res) => {
    try {
        // await verifySession(req, res)
        successResponse(res, '请求成功')
    } catch (e) {
        failureResponse(res, e)
    }
})

module.exports = router
