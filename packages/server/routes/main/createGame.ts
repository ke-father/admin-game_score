import express from 'express'

const router = express.Router()

interface ICreateGame {
    // 比赛名称
    gameName: string
    // 比赛logo
    gameLogo: string
    // 创建比赛的分类id
}

router.post('/createGame', (req, res) => {})

module.exports = router
