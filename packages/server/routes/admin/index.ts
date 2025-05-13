import express from 'express'

const router = express.Router()

// /admin/auth 用户认证
router.use('/auth', require('./auth'))

// /admin/gameInfo 获取比赛信息
router.use('/gameInfo', require('./gameInfo'))

// /admin/settings/flush-all 清除所有缓存
router.use('/settings', require('./settings'))

module.exports = router
