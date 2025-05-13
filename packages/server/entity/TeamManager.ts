import Singleton from 'aprnine-utils/src/Singleton'
import Team, {ITeam} from "./Team";
import {generate10DigitId} from '../utils/format'
import {delKey, getKey, getKeysByPattern, setKey} from "../utils/redis";

export type ICreateTeamItem = {
    teamName: string
}

export default class TeamManager extends Singleton{
    // 存入的所有队伍
    teams: Set<Team> = new Set()
    // id与队伍map
    idMapTeams: Map<number, Team> = new Map()
    // 比赛id与队伍map
    gameIdMapTeams: Map<string, Team[]> = new Map()

    static get Instance() {
        return super.GetInstance<TeamManager>()
    }

    async createTeam (gameId: string, teamItem: ICreateTeamItem, sectionsNumber: number): Promise<Team> {
        return new Promise(async (resolve, reject) => {
            try {
                const teamId = generate10DigitId()
                const { teamName } = teamItem
                const teamInstance = new Team({
                    id: teamId,
                    gameId: gameId,
                    name: teamName,
                    sectionsNumber
                })

                resolve(teamInstance)
            } catch (e) {
                reject(e)
            }
        })
    }

    async findTeamKeysByGameId (id: string) {
        return getKeysByPattern(`Team:${id}:*`)
    }

    async findTeam (key: string) {
        return await getKey(key)
    }

    async prePareData (data: ITeam) {
        return new Team(data)
    }

    // 保存进入数据库
    async saveTeamToDB () {}

    // 保存进入redis
    async saveTeamToRedis (teamInfo: Team) {
        await setKey(teamInfo.teamKey, teamInfo)
    }

    // 删除队伍
    async deleteTeamToRedis (teamInfo: Team) {
        await delKey(teamInfo.teamKey)
    }
}
