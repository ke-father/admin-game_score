import { Unauthorized } from 'http-errors'
import jwt from 'jsonwebtoken'
import { failureResponse } from '../utils/response'
import { Request, Response, NextFunction } from 'express'

module.exports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 判断token是否存在
        const { token } = req.headers;
        if (!token) throw new  Unauthorized('当前接口需要认证才能登陆');

        // 验证token
        const data = jwt.verify(token as string, process.env.JWT_SECRET as string);

        next();
    } catch (error) {
        failureResponse(res, error);
    }
};
