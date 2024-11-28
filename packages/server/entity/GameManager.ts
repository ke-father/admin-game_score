import TeamManager from "./TeamManager";
import Game from "./Game";
import Singleton from 'aprnine-utils/src/Singleton'
import User from "./User";
import UserManager from "./UserManager";
import {WebsocketApi} from "../types/websocket-enum";

interface ICreateGame {
    creatorId: number
    categoryId: number
    playStyleId: number,
    gameName: string
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

    createGame ({ creatorId, categoryId, playStyleId, gameName }: ICreateGame) {
        const gameInstance = new Game({
            gameId: 1,
            creatorId,
            categoryId,
            playStyleId,
            gameName
        })
        this.games.add(gameInstance)
        this.idMapGames.set(gameInstance.gameId, gameInstance)
        return gameInstance
    }

    // 加入比赛
    joinGame (userId: number, gameId: number) {
        if (!this.gameIdMapUsers.has(gameId)) this.gameIdMapUsers.set(gameId, [])
        const user = UserManager.Instance.idMapUsers.get(userId)
        this.gameIdMapUsers.get(gameId)?.push(user as User)
    }

    // 针对关注比赛的用户更新比赛信息
    syncGameInfo (game: Game) {
        for (const user of this.gameIdMapUsers.get(game.gameId) as User[]) {
            // 每一个用户关注比赛的用户内容更新
            user.connection.sendMsg(WebsocketApi.UPDATE_GAME_INFO_SERVER, game)
        }
    }
}
