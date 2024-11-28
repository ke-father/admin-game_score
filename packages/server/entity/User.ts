// @ts-ignore
import { Connection } from 'aprnine-websocket/server'
import { BadRequest } from 'http-errors'

// 用户
export default class User {
    // 用户ID
    id: number = null!
    // websocket链接实例
    connection: Connection = null!
    // 关联的比赛ID
    gameId?: number = null!
    // 用户名
    username?: string = null!
    // 昵称
    nickname?: string = null!
    // 头像
    avatar?: string = null!
    // 角色
    roles?: number[] = null!

    constructor(user: Omit<User, 'connection'>, connection: Connection) {
        this.connection = connection
        if (!user.id) throw new BadRequest('用户ID不存在')
        Object.assign(this, user)
    }
}
