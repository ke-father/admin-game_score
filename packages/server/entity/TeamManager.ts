import Singleton from 'aprnine-utils/src/Singleton'
import Team, { ITeamParams } from "./Team";
import { generate10DigitId } from '../utils/format'
import {IRequest, WebsocketApi} from "../types/websocket-enum";
import {NotFound} from "http-errors";

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
    idMapTeams: Map<string | number, Team> = new Map()
    // 比赛id与队伍map
    gameIdMapTeams: Map<number, Team[]> = new Map()

    static get Instance() {
        return super.GetInstance<TeamManager>()
    }

    // 创建队伍 复数  因为可能有多个队伍
    createTeams<T = any[]> (params: ICreateTeam): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            const { gameId, teams, sectionsNumber } = params
            resolve(teams.map((team, index) => this.createTeam(gameId, team, sectionsNumber, index)))
        })
    }

    createTeam (gameId: number, teamItem: ICreateTeamItem, sectionsNumber: number, index: number) {
        // 创建10位数id
        // const id = generate10DigitId()
        const id = index ? 10086 : 10000
        if (this.idMapTeams.has(id)) return this.createTeam(gameId, teamItem, sectionsNumber, index)

        // 规整参数
        const teamParams = {
            sectionsNumber,
            gameId,
            name: teamItem.teamName,
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

    updateTeamData (gameId: number, args: IRequest[WebsocketApi.UPDATE_TEAM_DATA]) {
        return new Promise((resolve, reject) => {
           try {
               const { teamId, score, periods, time, foul } = args
               const team = this.idMapTeams.get(teamId)
               if (!team) throw new NotFound('队伍不存在')
               // 得分是累计
               team.score += args.score
               team.scoreDetail[periods].totalFouls += Number(foul)
               team.scoreDetail[periods].totalPointsScored += Number(score)
               team.scoreDetail[periods].timeRecords[String(time)] = {
                   pointsScored: Number(score),
                   fouls: foul
               }

               resolve(team)
           } catch (e) {
               reject(e)
           }
        })
    }

    deleteGameTeams (gameId: number) {
        const teams = this.gameIdMapTeams.get(gameId)
        if (!teams) return
        teams.forEach(team => {
            this.teams.delete(team)
            this.idMapTeams.delete(team.id)
        })
        this.gameIdMapTeams.delete(gameId)
    }
}
