import express from 'express'

const router = express.Router()

// /admin/auth 用户认证
router.use('/auth', require('./auth'))

// /admin/gameInfo 获取比赛信息
router.use('/gameInfo', require('./gameInfo'))

module.exports = router
