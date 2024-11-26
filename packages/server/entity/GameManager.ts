import TeamManager from "./TeamManager";

export interface IGameManager {
    gameId: number;
    categoryId: number;
    playStyleId: number;
    name: string;
    logo?: string;
    signature?: string;
    description?: string;
    createdAt?: number;
    updatedAt?: number;
}

export class GameManager {
    // 比赛id
    private gameId: number = null!
    // 比赛分类id
    private categoryId: number = null!
    // 比赛方式id
    private playStyleId: number = null!
    // 比赛名称
    private name: string = null!
    // 比赛logo
    private logo?: string = null!
    // 比赛签名
    private signature?: string = null!
    // 比赛简介
    private description?: string = null!
    // 创建时间
    private createdAt?: number = null!
    // 更新时间
    private updatedAt?: number = null!
    // 队伍数据
    private teamMap?: Map<number, TeamManager> = new Map();

    constructor(params: IGameManager) {
        Object.assign(this, params)
    }
}
