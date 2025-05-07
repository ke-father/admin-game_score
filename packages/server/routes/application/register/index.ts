import bcrypt from "bcryptjs";
import createHttpError from "http-errors";

const { User } = require('../../../models')


const registerUser = async ({ account, role, password }) => {
    const body = {
        account,
        role,
        nickname: '用户',
        password: bcrypt.hashSync(password, 10)
    }

    const user = await User.create(body)
    delete user.dataValues.password

    return user
}

export default registerUser
