// @ts-ignore
import { Connection } from 'aprnine-websocket/server'
import { BadRequest } from 'http-errors'
import {WebsocketApi} from "../types/websocket-enum";

// 用户
export default class User {
    // 用户ID
    id: string = null!
    // websocket链接实例
    connection: Connection<WebsocketApi> = null!
    // 关联的比赛ID
    gameKeys?: string = null!
    // 用户名
    username?: string = null!
    // 昵称
    nickname?: string = null!
    // 头像
    avatar?: string = null!
    // 角色
    roles?: number[] = null!

    constructor(user: Omit<User, 'connection'>, connection: Connection<WebsocketApi>) {
        this.connection = connection
        if (!user.id) throw new BadRequest('用户ID不存在')
        Object.assign(this, user)
    }
}
