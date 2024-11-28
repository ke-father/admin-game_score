import Singleton from 'aprnine-utils/src/Singleton'

// 获取Game模型
const { Game } = require('../models')

export default class DataManager extends Singleton {
    static get Instance() {
        return super.GetInstance<DataManager>();
    }

    id: number = null!

    // async initGame (gameId: number) {
    //     if (!gameId) throw new Error('缺少游戏id');
    //
    //     // 查找Game内容
    //     console.log(Game)
    // }
}
