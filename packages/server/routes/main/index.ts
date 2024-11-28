import express from 'express'

const router = express.Router()

// 创建比赛
router.use('/createGame', require('./createGame'))

module.exports = router
