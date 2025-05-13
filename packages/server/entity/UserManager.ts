// @ts-ignore
import {Connection} from 'aprnine-websocket/server'
import User from './User'
import Singleton from 'aprnine-utils/src/Singleton'
import {WebsocketApi} from "../types/websocket-enum";
import GameManager from "./GameManager";

const {User: UserModel} = require('../models')

type ICreateUser = {
    user: Omit<User, 'connection'>
    connection: Connection<WebsocketApi>
}

// 用户
export default class UserManager extends Singleton {
    static get Instance() {
        return super.GetInstance<UserManager>()
    }

    // 用户
    users: Set<User> = new Set<User>()
    // 用户列表
    idMapUsers: Map<string, User> = new Map()
    // 比赛列表对应的用户
    gameKeysMapUsers: Map<string, string[]> = new Map()

    /**
     * 创建用户
     * @param user 用户信息
     * @param connection websocket链接实例
     */
    createUser({user, connection}: ICreateUser) {
        // 查找用户
        const userInstance = new User(user, connection)
        this.users.add(userInstance)
        this.idMapUsers.set(userInstance.id, userInstance)
        return userInstance
    }


    removeUser(userId: string) {
        const user = this.idMapUsers.get(userId)
        // 查找用户
        if (!user) return
        // 离开比赛
        // GameManager.Instance.leaveGame(userId, user.gameId)
        this.users.delete(user)
        this.idMapUsers.delete(userId)
        const users = this.gameKeysMapUsers.get(user.gameKeys)
        this.gameKeysMapUsers.set(user.gameKeys, users.filter(item => item !== user.id))
    }
}
