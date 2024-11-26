import express from 'express'
import DataManager from "../global/DataManager";
import {successResponse} from "../utils/response";

const router = express.Router()

// 前台接口
router.use('/main', require('./main'))

// // 后台接口
router.use('/admin', require('./admin'))

// 微信接口
router.use('/wechat', require('./wechat'))

// 上传接口
router.use('/uploads', require('./upload'))

router.get('/test', (req, res) => {
    const { id } = req.query as { id: number, [key: string]: any }
    DataManager.Instance.id = id
    successResponse(res, '响应', {
        id: DataManager.Instance.id
    })
})

module.exports = router
