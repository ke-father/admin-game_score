import TeamManager from "./TeamManager";

export default class Game {
    // 创建人
     creatorId: number = null!
    // 比赛id
     gameId: number = null!
    // 比赛方式id
     playStyleId: number = null!
    // 比赛名称
     gameName: string = null!
    // 比赛logo
     logo?: string = null!
    // 比赛签名
     signature?: string = null!
    // 比赛简介
     description?: string = null!
    // 创建时间
     createdAt?: number = null!
    // 更新时间
     updatedAt?: number = null!
    // 当前比赛节数
     currentRound?: number = 0
    // 队伍数据
     teamMap?: Map<number, TeamManager> = new Map();

    constructor(params: Game) {
        Object.assign(this, params)
    }
}
