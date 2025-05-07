import TeamManager from "./TeamManager";
import GameManager from "./GameManager";
import {NotFound} from "http-errors";
import {setKey} from "../utils/redis";

interface IGame {
    // 创建人
    userId: number
    // 比赛id
    id: string
    // 比赛方式id
    gamePlayStyleId: number
    // 比赛名称
    name: string
    // 比赛队伍id
    teamIds?: string
    // 比赛logo
    logo?: string
    // 比赛签名
    signature?: string
    // 比赛简介
    description?: string
    // 创建时间
    createdAt?: number
    // 更新时间
    updatedAt?: number
    // 当前比赛节数
    currentRound?: number
    // 比赛时间长度
    gameTime?: number
    // 比赛定时器
    gameTimer?: any
    // 暂停定时器
    pauseTimer?: any
    // 暂停时间
    pauseTime?: number
}

export default class Game {
    // 创建人
    userId: number = null!
    // 比赛id
     id: string = null!
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
    // 比赛时间长度
     gameTime?: number = 0
    // 比赛定时器
    gameTimer?: any = null!
    // 暂停定时器
    pauseTimer?: any = null!
    // 暂停时间
    pauseTime?: number = 0
    // 队伍数据
    teamMap?: string[] = []

    constructor(params: IGame) {
        Object.assign(this, params)
    }

    // 保存比赛
    async saveGameToRedis () {
        await setKey(this.id, this)
    }

    async saveGameToDB () {}

    joinGame (teamId: string) {
        this.teamMap.push(teamId)
    }

    // 开始比赛
    start () {
        // 清除暂停定时器
        this.pauseTimer && clearInterval(this.pauseTimer)
        this.pauseTime = 0
        this.gameTimer = setInterval(() => {
            this.gameTime += 1000
            GameManager.Instance.syncGameTime(this.id, this.gameTime)
        }, 1000)
    }

    private handlePause (handler: Function) {
        // 暂停开始定时器
        this.gameTimer && clearInterval(this.gameTimer)
        this.pauseTimer = setInterval(() => {
            this.pauseTime += 1000
            handler(this.pauseTime)
        }, 1000)
    }

    // 暂停比赛
    pause () {
        this.handlePause((time: number) => {
            GameManager.Instance.syncGamePause(this.id, time)
        })
    }

    // 关于队伍暂停
    teamPause (teamId: number) {
        // 记录队伍暂停
        const team = TeamManager.Instance.idMapTeams.get(teamId)
        if (!team) throw new NotFound('队伍不存在')

        team.pause(this)

        this.handlePause((time: number) => {
            GameManager.Instance.syncGamePause(this.id, time, teamId)
        })
    }

    // 结束比赛
    endGame () {
        this.gameTimer && clearInterval(this.gameTimer)
        this.pauseTimer && clearInterval(this.pauseTimer)
        this.pauseTime = 0
        this.gameTime = 0
        GameManager.Instance.syncUsersEndGame(this)
    }
}
