import TimeRecord from "./TimeRecord";
import {NotFound} from "http-errors";
import GameManager from "./GameManager";
import Game from "./Game";
import {setKey} from "../utils/redis";

export interface ITeam {
    // 比赛id
    gameId: string
    // 队伍id
    id: string
    // 队伍名称
    name?: string
    // 队伍标志
    teamMark?: string
    // 队伍得分
    score?: number
    // 队伍得分数据详细
    timeDetail?: TimeRecord[]
    // 队伍成员
    members?: number[]
    // 队伍key
    teamKey?: string
    // 比赛总节数
    sectionsNumber: number
}

export default class Team {
    // 比赛id
    gameId: string = null!
    // 队伍id
    id: string = null!
    // 队伍名称
    name?: string = null!
    // 队伍标志
    teamMark?: string = null!
    // 队伍得分
    score?: number = 0
    // 队伍得分数据详细
    timeDetail?: TimeRecord[] = []
    // 队伍成员
    members?: number[] = null!
    // 队伍key
    teamKey?: string = null!
    // 比赛总节数
    sectionsNumber: number

    constructor(params: ITeam) {
        if (!params.gameId) throw new NotFound('比赛id不存在')
        this.id = params.id
        this.gameId = params.gameId
        this.name = params.name
        this.teamMark = params.teamMark
        this.members = params.members
        this.score = params.score
        this.sectionsNumber = params.sectionsNumber
        if (params.timeDetail.length) this.timeDetail = params.timeDetail
        else {
            for (let i = 0; i < params.sectionsNumber; i++) {
                this.timeDetail.push(new TimeRecord())
            }
        }
    }

    // 加入比赛
    joinGame (game: Game) {
        this.teamKey = `team:${this.gameId}_${this.id}`
        game.teamMap.push(this.teamKey)
    }

    pause(game: Game) {
        const gameTime = game.gameTime
        this.timeDetail[game.currentRound - 1].totalPauses++
        this.timeDetail[game.currentRound - 1].timeRecords[gameTime].pauses = true
    }

    updateScore(game: Game, data: number) {
        const gameTime = game.gameTime
        this.score += data
        this.timeDetail[game.currentRound - 1].totalPointsScored += data
        this.timeDetail[game.currentRound - 1].timeRecords[gameTime].pointsScored = data

        return {
            teamId: this.id,
            score: this.score,
            totalPointsScored: this.timeDetail[game.currentRound - 1].totalPointsScored,
            timeRecord: {
                [gameTime]: this.timeDetail[game.currentRound - 1].timeRecords[gameTime]
            }
        }
    }

    updateFoul (game: Game) {
        const gameTime = game.gameTime
        this.timeDetail[game.currentRound - 1].totalFouls++
        this.timeDetail[game.currentRound - 1].timeRecords[gameTime].fouls = true

        return {
            teamId: this.id,
            totalFouls: this.timeDetail[game.currentRound - 1].totalFouls,
            timeRecord: {
                [gameTime]: this.timeDetail[game.currentRound - 1].timeRecords[gameTime]
            }
        }
    }

    // 保存进入数据库
    async saveTeamToDB () {}

    // 保存进入redis
    async saveTeamToRedis () {
        await setKey(this.teamKey, this)
    }
}
