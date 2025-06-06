import express from 'express'
const router = express.Router()
import svgCaptcha from 'svg-captcha'
import {failureResponse, successResponse} from "../utils/response";
import {setKey} from "../utils/redis";
import {v4 as uuidv4} from "uuid"

// 获取验证码
router.get('/', async (req, res) => {
    try {
        // 创建图形验证码
        const captcha = svgCaptcha.create({
            size: 4,                    // 验证码长度
            ignoreChars: '0O1Il9quv',   // 验证码字符中排除 0O1Il9quv
            noise: 3,                   // 干扰线条数量
            color: true,                // 是否有颜色，
            width: 100,                 // 宽
            height: 40                  // 高
        })
        const CAPTCHA_KEY = `CAPTCHA_KEY:${uuidv4()}`
        // 存入redis
        await setKey(CAPTCHA_KEY, captcha.text, 60 * 10)

        successResponse(res, '验证码获取成功', {
            captchaKey: CAPTCHA_KEY,
            captchaData: captcha.data
        })
    } catch (e) {
        failureResponse(res, e)
    }
})

module.exports = router
