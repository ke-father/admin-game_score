import TeamManager from "./TeamManager";
import Game from "./Game";
import Singleton from 'aprnine-utils/src/Singleton'
import User from "./User";
import UserManager from "./UserManager";
import {WebsocketApi} from "../types/websocket-enum";
import {generate10DigitId} from "../utils/format";
import {ICreateTeamItem} from "./TeamManager";
import Team from "./Team";

interface ICreateGame {
    // 创建者id
    creatorId: number,
    // 比赛方式id
    playStyleId: number,
    // 比赛名称
    gameName: string,
    // 队伍信息
    teams: ICreateTeamItem[]
    // 比赛节数
    sectionsNumber: number
}

export default class GameManager extends Singleton{
    // 存入的所有比赛
    games: Set<Game> = new Set()
    // id与比赛map
    idMapGames: Map<number, Game> = new Map()
    // 比赛 用户列表
    gameIdMapUsers: Map<number, User[]> = new Map()

    static get Instance() {
        return super.GetInstance<GameManager>()
    }

    async createGame <T = object> (params: ICreateGame): Promise<{game: Game, teams: Team[]}> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = generate10DigitId()
                if (this.idMapGames.has(id)) return this.createGame(params)
                const { creatorId, playStyleId, gameName, teams, sectionsNumber } = params

                // 创建比赛
                const gameInstance = new Game({
                    gameId: id,
                    creatorId,
                    playStyleId,
                    gameName
                })
                this.games.add(gameInstance)
                this.idMapGames.set(gameInstance.gameId, gameInstance)

                // 创建队伍
                const teamsInstance = await TeamManager.Instance.createTeams({
                    gameId: id,
                    teams,
                    sectionsNumber
                })

                console.log('gameInstance', gameInstance)

                resolve({
                    game: gameInstance,
                    teams: teamsInstance
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    // 加入比赛
    joinGame (userId: number, gameId: number) {
        if (!this.gameIdMapUsers.has(gameId)) this.gameIdMapUsers.set(gameId, [])
        const user = UserManager.Instance.idMapUsers.get(userId)
        this.gameIdMapUsers.get(gameId)?.push(user as User)
    }

    // 针对关注比赛的用户更新比赛信息
    syncGameInfo (game: Game) {
        const params = {
            ...game,
            teams: TeamManager.Instance.gameIdMapTeams.get(game.gameId)
        }

        for (const user of this.gameIdMapUsers.get(game.gameId) as User[]) {
            // 每一个用户关注比赛的用户内容更新
            user.connection.sendMsg(WebsocketApi.UPDATE_GAME_INFO_SERVER, params)
        }
    }

    // 更新比赛得分
}
