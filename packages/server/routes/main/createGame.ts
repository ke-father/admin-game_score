import express from 'express'
import GameManager from "../../entity/GameManager";
import {failureResponse, successResponse} from "../../utils/response";
import CenterControl from "../../entity/centerControl";

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        console.log(11111111)
        // 创建用户
        const { userId, playStyleId, gameName, teams, sectionsNumber } = req.body

        // 创建比赛
        const info = await CenterControl.initGame({
            userId,
            name: gameName,
            gamePlayStyleId: playStyleId,
            teams,
            sectionsNumber
        })

        console.log('gameInfo', info)

        successResponse(res, '创建成功', {...info})
    } catch (e) {
        console.log(e)
        failureResponse(res, '创建失败')
    }
})

module.exports = router
