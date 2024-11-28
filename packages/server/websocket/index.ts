// @ts-ignore
import {Connection, MyServer} from 'aprnine-websocket/server'
import {IRequest, WebsocketApi} from "../types/websocket-enum";
import DataManager from "../global/DataManager";
import GameManager from "../entity/GameManager";
import UserManager from "../entity/UserManager";
import {BadRequest, Unauthorized} from "http-errors";
import TeamManager from "../entity/TeamManager";
import Team from "../entity/Team";
const {} = require('../models')

export default function (websocketApp: MyServer) {
    // @ts-ignore 初始化比赛
    // websocketApp.setApi<IRequest[WebsocketApi.INIT_GAME]>(WebsocketApi.INIT_GAME, (connection, args) => {
    //     if (!args.userId) throw new BadRequest('请传入用户ID')
    //     // 创建用户
    //     const { userId, playStyleId, categoryId, gameName } = args
    //
    //     const user = UserManager.Instance.createUser({ user: { id: userId }, connection })
    //     // 关联用户与websocket实例
    //     connection.userId = userId
    //
    //     // 创建比赛
    //     const game = GameManager.Instance.createGame({
    //         creatorId: userId,
    //         playStyleId,
    //         categoryId,
    //         gameName
    //     })
    //     // 关联id
    //     user.gameId = game.gameId
    //     GameManager.Instance.joinGame(userId, game.gameId)
    //
    //     return game
    // })

    // 加入比赛内容
    websocketApp.setApi<IRequest[WebsocketApi.JOIN_GAME]>(WebsocketApi.JOIN_GAME, (connection: Connection<WebsocketApi>, args) => {
        if (!args.userId || !args.gameId) throw new BadRequest('请传入用户ID和比赛ID')

        const { userId, gameId } = args

        const user = UserManager.Instance.createUser({ user: { id: userId }, connection })
        // 关联用户与websocket实例
        connection.userId = userId

        // 加入比赛
        const game = GameManager.Instance.idMapGames.get(gameId)

        if (!game) throw new BadRequest('比赛不存在')
        // 关联id
        user.gameId = game.gameId
        GameManager.Instance.joinGame(userId, game.gameId)

        return game
    })

    // 更新比赛信息
    websocketApp.setApi<IRequest[WebsocketApi.UPDATE_GAME_INFO]>(WebsocketApi.UPDATE_GAME_INFO, (connection: Connection<WebsocketApi>, args) => {
        const { userId, gameId, gameInfo } = args
        if (!userId || !gameId) throw new BadRequest('请传入用户ID和比赛ID')
        // 判断当前用户是否为比赛创建者
        const game = GameManager.Instance.idMapGames.get(gameId)
        if (!game || game.creatorId !== userId) throw new Unauthorized('当前用户不可更改比赛信息')

        // 更新内容
        game.gameName = gameInfo?.gameName

        GameManager.Instance.syncGameInfo(game)

        return {
            ...game,
            teams: TeamManager.Instance.gameIdMapTeams.get(game.gameId)
        }
    })

    // 更新比赛得分
    websocketApp.setApi<IRequest[WebsocketApi.UPDATE_TEAM_DATA]>(WebsocketApi.UPDATE_TEAM_DATA,  (connection: Connection<WebsocketApi>, args) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {userId, gameId} = args
                if (!userId || !gameId) throw new BadRequest('请传入用户ID和比赛ID')
                // 判断当前用户是否为比赛创建者
                const game = GameManager.Instance.idMapGames.get(gameId)
                if (!game || game.creatorId !== userId) throw new Unauthorized('当前用户不可更改比赛信息')

                // 更新数据
                const team = await TeamManager.Instance.updateTeamData(gameId, args)
                // 更新所有关注该比赛的用户
                GameManager.Instance.syncTeamDataInfo(gameId, team as Team)
                resolve(team)
            } catch (e) {
                reject(e)
            }
        })
    })


    const initGame = () => {
        return new Promise((resolve, reject) => {

        })
    }
}
