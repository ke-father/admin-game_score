import Game from "./Game";
import Singleton from 'aprnine-utils/src/Singleton'
import {generate10DigitId} from "../utils/format";
import {delKey, getKey, getKeysByPattern, setKey} from "../utils/redis";
import User from "./User";

interface ICreateGame {
    // 创建者id
    userId: string,
    // 比赛方式id
    gamePlayStyleId: number,
    // 比赛名称
    name: string
    // 比赛节数
    sectionsNumber: number
}

export default class GameManager extends Singleton{
    static get Instance() {
        return super.GetInstance<GameManager>()
    }

    // 创建比赛
    async createGame <T = object> (params: ICreateGame): Promise<Game> {
        return new Promise(async (resolve, reject) => {
            try {
                const gameId = generate10DigitId()
                const { userId, gamePlayStyleId, name, sectionsNumber } = params

                // 创建比赛
                const gameInstance = new Game({
                    id: gameId,
                    userId,
                    gamePlayStyleId,
                    name
                })

                resolve(gameInstance)
            } catch (e) {
                reject(e)
            }
        })
    }

    async findGameByUserId (userId: string) {
        return await getKeysByPattern(`Game:${userId}:*`)
    }

    // 查找比赛
    async findGame(gameKey) {
        return await getKey(gameKey)
    }

    // 保存比赛
    async saveGameToRedis (gameInfo: Game) {
        await setKey(gameInfo.gameKey, gameInfo)
    }

    // 删除比赛
    async deleteGameToRedis (gameInfo: Game) {
        await delKey(gameInfo.gameKey)
    }

    async saveGameToDB () {}

    // 加入比赛
    joinGame (userId: number, gameId: string) {
    }

    // 针对关注比赛的用户更新比赛信息
    // syncGameInfo (game: Game) {
    //     const params = {
    //         ...game,
    //         teams: TeamManager.Instance.gameIdMapTeams.get(game.gameId)
    //     }
    //
    //     for (const user of this.gameIdMapUsers.get(game.gameId) as User[]) {
    //         // 每一个用户关注比赛的用户内容更新
    //         user.connection.sendMsg(WebsocketApi.UPDATE_GAME_INFO, params)
    //     }
    // }

    // 更新队伍信息 —— 得分或犯规
    syncTeamDataInfo (gameId: string, data: any) {
        // for (const user of this.gameIdMapUsers.get(gameId) as User[]) {
        //     // 每一个用户关注比赛的用户内容更新
        //     user.connection.sendMsg(WebsocketApi.UPDATE_TEAM_DATA, data)
        // }
    }

    // 更新比赛数据——时间
    syncGameTime (gameId: string, time: number) {
        // for (const user of this.gameIdMapUsers.get(gameId) as User[]) {
        //     // 每一个用户关注比赛的用户内容更新
        //     user.connection.sendMsg(WebsocketApi.SYNC_GAME_TIME, {
        //         time
        //     })
        // }
    }

    // 更新比赛数据——暂停时间
    syncGamePause (gameId: string, time: number, teamId?: number) {
        // for (const user of this.gameIdMapUsers.get(gameId) as User[]) {
        //     // 每一个用户关注比赛的用户内容更新
        //     user.connection.sendMsg(WebsocketApi.PAUSE_GAME, {
        //         time,
        //         teamId
        //     })
        // }
    }

    // 结束比赛
    syncUsersEndGame (game: Game) {
    }
}
