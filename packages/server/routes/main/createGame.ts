import express from 'express'
import GameManager from "../../entity/GameManager";
import {failureResponse, successResponse} from "../../utils/response";

const router = express.Router()

interface ICreateGame {
    // 用户id
    userId: number
    // 比赛方式id
    playStyleId: number
    // 创建比赛的分类id
    categoryId: number
    // 比赛名称
    gameName: string
}

router.post('/', async (req, res) => {
    try {
        // 创建用户
        const { userId, playStyleId, gameName, teams, sectionsNumber } = req.body

        // 创建比赛
        const game = await GameManager.Instance.createGame({
            creatorId: userId,
            playStyleId,
            gameName,
            teams,
            sectionsNumber
        })

        // console.log('gameId', game.gameId)

        successResponse(res, '创建成功', {game})
    } catch (e) {
        failureResponse(res, '创建失败')
    }
})

module.exports = router
