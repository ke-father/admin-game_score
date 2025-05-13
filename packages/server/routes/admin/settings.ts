import express from "express";
import {flushAll} from "../../utils/redis";
import {failureResponse, successResponse} from "../../utils/response";
const router = express.Router()

router.use('/flush-all', async (req, res) => {
    try {
        await flushAll()
        successResponse(res, '清除所有缓存成功')
    } catch (e) {
        failureResponse(res, e)
    }
})

module.exports = router
