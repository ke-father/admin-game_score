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
    PAUSE_GAME_SERVER = 'pause_game_server',
    // 队伍比赛暂停
    PAUSE_GAME_BY_TEAM = 'pause_game_by_team',
    // 比赛结束
    END_GAME = 'end_game',
    // 离开比赛
    LEAVE_GAME = 'leave_game',
    // 实时更新
    UPDATE_GAME_DATA_NOW_SERVER = 'update_game_data_now_server'
}

type IControlGame = {
    userId: number,
    gameId: number
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
    [WebsocketApi.START_GAME]: IControlGame
    [WebsocketApi.PAUSE_GAME]: IControlGame & {
        teamId?: number
    }
    [WebsocketApi.END_GAME]: IControlGame
    [WebsocketApi.LEAVE_GAME]: IControlGame
}

export interface IResponse {
    [WebsocketApi.UPDATE_GAME_INFO]: Game
}


