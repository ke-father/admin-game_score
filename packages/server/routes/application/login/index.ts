import createHttpError from "http-errors";
import {Op} from "sequelize";
import bcrypt from "bcryptjs";
import {UserEnum} from "../../../types/user-enum";
import jwt from "jsonwebtoken";
import {successResponse} from "../../../utils/response";

const {User} = require('../../../models');

const login_application = async (req, res) => {
    const {account, password} = req.body

    // 判断是否填写账户名
    if (!account) throw new createHttpError.BadRequest('请填写账户名')
// 判断是否填写密码
    if (!password) throw new createHttpError.BadRequest('请填写密码')
// 校验密码
    if (password.length < 6 || password.length > 45) throw new createHttpError.BadRequest('密码长度为6-45位')

    const condition = {
        where: {
            [Op.or]: [
                {email: account},
                {account}
            ]
        }
    }

// 查找用户
    const user = await User.findOne(condition)
    if (!user) throw new createHttpError.NotFound('用户不存在')

// 验证密码
    const isValid = await bcrypt.compareSync(password, user.password)
    if (!isValid) throw new createHttpError.BadRequest('密码错误')

    // @ts-ignore
    login_application.validRole && login_application.validRole(user)

// 生成token
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    successResponse(res, '登录成功', {
        token
    })
}

export default login_application
