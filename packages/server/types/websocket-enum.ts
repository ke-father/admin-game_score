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
    // 同步比赛时间
    SYNC_GAME_TIME = 'sync_game_time',
    // 比赛开始
    START_GAME = 'start_game',
    // 比赛暂停
    PAUSE_GAME = 'pause_game',
    // 比赛结束
    END_GAME = 'end_game',
    // 离开比赛
    LEAVE_GAME = 'leave_game',
    // 获取比赛信息
    GET_GAME_INFO = 'get_game_info',
    // 获取比赛得分信息
    GET_GAME_SCORE_INFO = 'get_game_score_info_list',
    // 获取队伍信息
    GET_TEAM_INFO = 'get_team_info',
    // 获取时间轴数据
    GET_TIME_LINE_DATA = 'get_time_line_data'
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
        gameId: string
    }
    [WebsocketApi.UPDATE_GAME_INFO]: {
        userId: number,
        gameId: string,
        gameInfo: Game
    },
    [WebsocketApi.UPDATE_TEAM_DATA]: {
        userId: number,
        gameId: string,
        teamId: number,
        score?: number,
        foul?: boolean,

    }
    [WebsocketApi.START_GAME]: IControlGame
    [WebsocketApi.PAUSE_GAME]: IControlGame & {
        teamId?: number
    }
    [WebsocketApi.END_GAME]: IControlGame
    [WebsocketApi.LEAVE_GAME]: IControlGame
    [WebsocketApi.GET_GAME_SCORE_INFO]: {
        gameId: string
    }
}

export interface IResponse {
    [WebsocketApi.UPDATE_GAME_INFO]: Game
}


