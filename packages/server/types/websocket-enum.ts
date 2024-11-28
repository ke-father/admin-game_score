import Game from "../entity/Game";

export enum WebsocketApi {
    // 初始化比赛
    INIT_GAME = 'init_game',
    // 加入比赛
    JOIN_GAME = 'join_game',
    // 更新比赛信息
    UPDATE_GAME_INFO_CLIENT = 'update_game_info_client',
    // 更新比赛信息
    UPDATE_GAME_INFO_SERVER = 'update_game_info_SERVER',
}

export interface IRequest {
    [WebsocketApi.INIT_GAME]: {
        userId: number,
        categoryId: number,
        playStyleId: number,
        gameName: string
    }
    [WebsocketApi.JOIN_GAME]: {
        userId: number,
        gameId: number
    }
    [WebsocketApi.UPDATE_GAME_INFO_CLIENT]: {
        userId: number,
        gameId: number,
        gameInfo: Game
    }
}

export interface IResponse {
    [WebsocketApi.UPDATE_GAME_INFO_SERVER]: Game
}


