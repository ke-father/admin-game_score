import Singleton from 'aprnine-utils/src/Singleton'
import Team, { ITeamParams } from "./Team";
import { generate10DigitId } from '../utils/format'
import {IRequest, WebsocketApi} from "../types/websocket-enum";

export type ICreateTeamItem = {
    teamName: string
}

export type ICreateTeam = {
    gameId:number, teams: ICreateTeamItem[],  sectionsNumber: number
}

export default class TeamManager extends Singleton{
    // 存入的所有队伍
    teams: Set<Team> = new Set()
    // id与队伍map
    idMapTeams: Map<number, Team> = new Map()
    // 比赛id与队伍map
    gameIdMapTeams: Map<number, Team[]> = new Map()

    static get Instance() {
        return super.GetInstance<TeamManager>()
    }

    // 创建队伍 复数  因为可能有多个队伍
    createTeams<T = any[]> (params: ICreateTeam): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            const { gameId, teams, sectionsNumber } = params
            resolve(teams.map(team => this.createTeam(gameId, team, sectionsNumber)))
        })
    }

    createTeam (gameId: number, teamItem: ICreateTeamItem, sectionsNumber: number) {
        // 创建10位数id
        const id = generate10DigitId()
        if (this.idMapTeams.has(id)) return this.createTeam(gameId, teamItem, sectionsNumber)

        // 规整参数
        const teamParams = {
            sectionsNumber,
            gameId,
            teamName: teamItem.teamName,
            id
        }
        const team = new Team(teamParams)
        this.idMapTeams.set(id, team)
        // 添加到比赛map中
        if (this.gameIdMapTeams.has(gameId)) {
            this.gameIdMapTeams.get(gameId)!.push(team)
        } else {
            this.gameIdMapTeams.set(gameId, [team])
        }

        return team
    }

    updateTeamData (gameId: number, args: IRequest[WebsocketApi.UPDATE_TEAM_DATA_CLIENT]) {
        const { teamId, score, periods, time, foul } = args
        const team = this.idMapTeams.get(teamId)
        if (!team) return
        // 得分是累计
        team.score += args.score
        team.scoreDetail[periods].totalFouls += Number(foul)
        team.scoreDetail[periods].totalPointsScored += Number(score)
        team.scoreDetail[periods].timeRecords[time] = {
            pointScored: Number(score),
            fouls: foul
        }

        return team
    }
}
