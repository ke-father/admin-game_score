// @ts-ignore
import { Connection } from 'aprnine-websocket/server'
import User from './User'
import Singleton from 'aprnine-utils/src/Singleton'
const { User: UserModel } = require('../models')

type ICreateUser = {
    user: Omit<User, 'connection'>
    connection: Connection
}

// 用户
export default class UserManager extends Singleton {
    static get Instance() {
        return super.GetInstance<UserManager>()
    }

    // 用户
    users: Set<User> = new Set<User>()
    // 用户列表
    idMapUsers: Map<number, User> = new Map()

    /**
     * 创建用户
     * @param user 用户信息
     * @param connection websocket链接实例
     */
    createUser ({ user, connection }: ICreateUser) {
        // 查找用户
        const userInstance = new User(user, connection)
        this.users.add(userInstance)
        this.idMapUsers.set(userInstance.id, userInstance)
        return userInstance
    }


}
