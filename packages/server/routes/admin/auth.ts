import express from 'express'
import { successResponse, failureResponse } from "../../utils/response";
import createHttpError from "http-errors";
import {Op} from "sequelize";
import bcrypt from "bcryptjs";
import {UserEnum} from "../../types/user-enum";
import jwt from "jsonwebtoken";
import login_application from "../application/login";

const {User} = require('../../models');

const router = express.Router()

// 关于后台登录
router.post('/login', async (req, res) => {
    try {
        // @ts-ignore
        login_application.validRole = (user) => {
            if (user.role !== UserEnum.ADMIN) throw new createHttpError.Unauthorized('用户权限不足')
        }

        await login_application(req, res)
    } catch (e) {
        failureResponse(res, e)
    }
})

module.exports = router
