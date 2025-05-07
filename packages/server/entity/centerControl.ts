import GameManager from "./GameManager";
import TeamManager from "./TeamManager";
import Team from "./Team";

interface IInitGameInfo {
    // 创建者id
    userId: number
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
    // 初始化比赛流程
    async initGame (info: IInitGameInfo) {
        const { userId, gamePlayStyleId, name, sectionsNumber, teams } = info

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
        await game.saveGameToRedis()
        for (let team of teamInstances) {
            // team.saveTeamToDB().then()
            await team.saveTeamToRedis()
        }

        // 返回比赛与队伍信息
        return { game, teams: teamInstances }
    }
}

const centerControl = new CenterControl()

export default centerControl
