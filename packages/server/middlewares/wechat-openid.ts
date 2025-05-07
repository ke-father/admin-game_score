import {Unauthorized} from "http-errors";
import jwt from "jsonwebtoken";
import {failureResponse} from "../utils/response";

module.exports = async (req, res, next) => {
    try {
        // 判断token是否存在
        const { token } = req.headers;
        if (!token) throw new  Unauthorized('当前接口需要认证才能登陆');

        // 验证token
        // @ts-ignore
        const { openid } = jwt.verify(token as string, process.env.JWT_SECRET as string)

        // @ts-ignore
        req.openid = openid

        next();
    } catch (error) {
        failureResponse(res, error);
    }
}
