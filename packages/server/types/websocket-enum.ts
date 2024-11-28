import Game from "../entity/Game";

export enum WebsocketApi {
    // 初始化比赛
    INIT_GAME = 'init_game',
    // 加入比赛
    JOIN_GAME = 'join_game',
    // 更新比赛信息
    UPDATE_GAME_INFO = 'update_game_info',
    UPDATE_GAME_INFO_SERVER = 'update_game_info_server',
    // 更新队伍数据
    UPDATE_TEAM_DATA = 'update_team_data',
    UPDATE_TEAM_DATA_SERVER = 'update_team_data_server',
    // 比赛开始
    START_GAME = 'start_game',
    // 比赛暂停
    PAUSE_GAME = 'pause_game',
    // 比赛结束
    END_GAME = 'end_game'
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
    [WebsocketApi.UPDATE_GAME_INFO]: {
        userId: number,
        gameId: number,
        gameInfo: Game
    },
    [WebsocketApi.UPDATE_TEAM_DATA]: {
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
    [WebsocketApi.START_GAME]: {
        userId: number,
        gameId: number
    }
    [WebsocketApi.PAUSE_GAME]: {
        userId: number,
        gameId: number
    }
    [WebsocketApi.END_GAME]: {
        userId: number,
        gameId: number
    }
}

export interface IResponse {
    [WebsocketApi.UPDATE_GAME_INFO]: Game
}


