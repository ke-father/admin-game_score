import GameManager from "./GameManager";
import TeamManager from "./TeamManager";
import Team, {ITeam} from "./Team";
import Game, {IGame} from "./Game";
import {BadRequest} from "http-errors";

interface IInitGameInfo {
    // 创建者id
    userId: string
    // 比赛名称
    name: string
    // 比赛类型
    gamePlayStyleId: number
    // 队伍信息
    teams: {
        // 比赛队伍名称
        teamName: string
    }[]
    // 比赛节数
    sectionsNumber: number
}

class CenterControl {
    // 生成比赛
    async initGame (info: IInitGameInfo) {
        const { userId } = info
        // 查找当前用户是否存在比赛
        const gameInfo = await this.searchGameOnCreating(userId)
        if (gameInfo.status) {
            return {
                allReady: true,
                game: gameInfo.game,
                teams: gameInfo.teams
            }
        }

        return await this.generateGame(info)
    }

    // 重新生成比赛
    async regenerateGame (info: IInitGameInfo) {
        const { userId } = info
        // 查找当前用户是否存在比赛
        const gameInfo = await this.searchGameOnCreating(userId)
        if (!gameInfo.status)  throw new BadRequest('当前用户不存在比赛')
        // 删除比赛
        await GameManager.Instance.deleteGameToRedis(gameInfo.game)
        // 删除队伍
        for (let team of gameInfo.teams) {
            await TeamManager.Instance.deleteTeamToRedis(team)
        }
        return await this.generateGame(info)
    }

    // 初始化比赛流程
    async generateGame (info: IInitGameInfo) {
        const { userId, gamePlayStyleId, name, sectionsNumber, teams } = info


        // TODO 存在比赛返回是否要继续 如果继续返回比赛内容
        // 如果不继续则删除已有内容并提示重新创建

        // 创建比赛
        const game = await GameManager.Instance.createGame({
            userId,
            gamePlayStyleId,
            name,
            sectionsNumber
        })
        // 创建队伍
        let teamInstances: Team[] = []
        for (let team of teams) {
            let teamInstance = await TeamManager.Instance.createTeam(game.id, team, sectionsNumber)
            teamInstances.push(teamInstance)
            teamInstance.joinGame(game)
        }

        // 保存信息
        // game.saveGameToDB().then()
        await GameManager.Instance.saveGameToRedis(game)
        for (let team of teamInstances) {
            // team.saveTeamToDB().then()
            await TeamManager.Instance.saveTeamToRedis(team)
        }

        // 返回比赛与队伍信息
        return { game, teams: teamInstances }
    }

    async searchGameOnCreating (userId: string) {
        const gameInfo = await this.searchGame(userId)
        if (!gameInfo.status) {
            return {
                status: false
            }
        }
        const teams = await this.searchTeam(gameInfo.game.id)
        return { status: true, game: gameInfo.game, teams: teams.teams }
    }

    // 查找比赛
    async searchGame (userId: string): Promise<{ status: boolean, game?: Game }> {
        // 获取比赛内容
        const gameKeys = await GameManager.Instance.findGameByUserId(userId)
        console.log('gameKeys', gameKeys)
        if (!gameKeys || !gameKeys.length) return {
            status: false
        }
        const gameKey = gameKeys[0]
        const game = await GameManager.Instance.findGame(gameKey)

        return { status: true, game }
    }

    // 查找队伍
    async searchTeam (gameId: string): Promise<{ status: boolean, teams?: Team[] }> {
        // 根据比赛数据获取队伍数据
        const teamKeys = await TeamManager.Instance.findTeamKeysByGameId(gameId)
        if (!teamKeys || !teamKeys.length) return {
            status: false
        }
        const teams = []
        for (let key of teamKeys) {
            const team = await TeamManager.Instance.findTeam(key)
            teams.push(team)
        }

        return {
            status: true,
            teams
        }
    }
}

const centerControl = new CenterControl()

export default centerControl
