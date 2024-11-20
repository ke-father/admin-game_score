import express = require('express')
const { game } = require('../models/init-models.js')
const router = express.Router()

// 前台接口
router.use('/main', require('./main'))

// // 后台接口
router.use('/admin', require('./admin'))

// 微信接口
router.use('/wechat', require('./wechat'))

module.exports = router
