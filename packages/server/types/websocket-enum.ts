import Game from "../entity/Game";

export enum WebsocketApi {
    // 初始化比赛
    INIT_GAME = 'init_game',
    // 加入比赛
    JOIN_GAME = 'join_game',
    // 更新比赛信息
    UPDATE_GAME_INFO_CLIENT = 'update_game_info_client',
    // 更新比赛信息
    UPDATE_GAME_INFO_SERVER = 'update_game_info_server',
    // 更新比赛得分
    UPDATE_TEAM_DATA_CLIENT = 'update_game_score_client',
    // 更新比赛得分
    UPDATE_TEAM_DATA_SERVER = 'update_game_score_server',
}

export interface IRequest {
    [WebsocketApi.INIT_GAME]: {
        userId: number,
        playStyleId: number,
        gameName: string,
        teams: {
            teamName: string
        }[],
        sectionsNumber: number
    }
    [WebsocketApi.JOIN_GAME]: {
        userId: number,
        gameId: number
    }
    [WebsocketApi.UPDATE_GAME_INFO_CLIENT]: {
        userId: number,
        gameId: number,
        gameInfo: Game
    },
    [WebsocketApi.UPDATE_TEAM_DATA_CLIENT]: {
        userId: number,
        gameId: number,
        teamId: number,
        score?: number,
        foul?: boolean,
        // 时间以戳的形式传递
        time: number,
        // 第几节
        periods: number,

    }
}

export interface IResponse {
    [WebsocketApi.UPDATE_GAME_INFO_SERVER]: Game
}


