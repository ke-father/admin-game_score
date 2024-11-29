import TimeRecord from "./TimeRecord";
import {NotFound} from "http-errors";
import GameManager from "./GameManager";
import Game from "./Game";

export type ITeamParams = {
    // 比赛id
    gameId: number
    // 队伍id
    id: number
    // 队伍名称
    name?: string
    // 队伍标志
    teamMark?: string
    // 队伍得分
    score?: number
    // 队伍得分数据详细
    scoreDetail?: TimeRecord[]
    // 队伍成员
    members?: number[]
    // 比赛总节数
    sectionsNumber: number
}

export default class Team {
    // 比赛id
    gameId: number = null!
    // 队伍id
    id: number = null!
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

    constructor(params: ITeamParams) {
        if (!params.gameId) throw new NotFound('比赛id不存在')
        this.id = params.id
        this.gameId = params.gameId
        this.name = params.name
        this.teamMark = params.teamMark
        this.members = params.members
        for (let i = 0; i < params.sectionsNumber; i++) {
            this.timeDetail.push(new TimeRecord())
        }
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
}
