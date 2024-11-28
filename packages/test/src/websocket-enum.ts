interface IGame {
    // 比赛id
    gameId: number
    // 比赛分类id
    categoryId: number
    // 比赛方式id
    playStyleId: number
    // 比赛名称
    gameName: string
    // 比赛logo
    logo?: string
    // 比赛签名
    signature?: string
    // 比赛简介
    description?: string
}

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
        gameInfo: IGame
    }
}

export interface IResponse {
    [WebsocketApi.UPDATE_GAME_INFO_SERVER]: IGame
}


