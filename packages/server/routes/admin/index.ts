import express from 'express'

const router = express.Router()

// 用户认证
router.use('/auth', require('./auth'))

// 获取比赛信息
router.use('/gameInfo', require('./gameInfo'))

module.exports = router
