import express = require('express')
const db = require('../models/index.js')
const router = express.Router()

// 前台接口
router.use('/main', require('./main'))

// 后台接口
router.use('/amin', require('./admin'))

module.exports = router
