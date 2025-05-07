import express from "express";
import {delKey} from "../../utils/redis";
import {failureResponse, successResponse} from "../../utils/response";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import {Op} from "sequelize";
import jwt from "jsonwebtoken";
import login_application from "../application/login";
import registerUser from "../application/register";
const router = express.Router()
const {User} = require('../../models')
const validateCaptcha = require('../../middlewares/validate-captcha')

// 用户注册
router.post('/sing_up', validateCaptcha, async (req, res) => {
    try {
        const { password, account } = req.body

        if (!account) throw new createHttpError.BadRequest('请填写账户名或邮箱')
        if (!password) throw new createHttpError.BadRequest('请填写密码')

        const user = await registerUser({ account, role: 1, password })

        // 删除验证码
        await delKey(req.body.captchaKey)

        successResponse(res, '创建用户成功', user)
    } catch (e) {
        failureResponse(res, e)
    }
})

// 用户登录
router.post(`/sign_in`, async (req, res) => {
    try {
        await login_application(req, res)
    } catch (error) {
        failureResponse(res, error);
    }
});

module.exports =  router
