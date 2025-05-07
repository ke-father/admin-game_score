import express from 'express'
import UserAuth from "../../middlewares/user-auth";
const router = express.Router()

router.use('/auth', require('./auth'))
// 创建比赛
router.use('/createGame', require('./createGame'))

module.exports = router
