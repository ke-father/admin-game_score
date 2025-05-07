import createHttpError from "http-errors";
import {getKey} from "../utils/redis";
import {failureResponse} from "../utils/response";

module.exports = async (req, res, next) => {
    try {
        const {captchaKey, captchaText} = req.body

        // 判断输入验证码
        if (!captchaText) throw new createHttpError.BadRequest('请输入验证码')

        // 从redis获取验证码的值
        const captcha = await getKey(captchaKey)
        if (!captcha) throw new createHttpError.BadRequest('验证码已过期')

        let status = captcha.toLowerCase() !== captchaText.toLowerCase()
        if (status) throw new createHttpError.BadRequest('验证码错误')

        next()
    } catch (e) {
        failureResponse(res, e)
    }
}
