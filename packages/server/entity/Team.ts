import TimeRecord from "./TimeRecord";
import {NotFound} from "http-errors";

export type ITeamParams = Team & {
    // 一共存在几节
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
    scoreDetail?: TimeRecord[] = []
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
            this.scoreDetail.push(new TimeRecord())
        }
    }
}
