import express from 'express'
import {failureResponse, successResponse} from "../utils/response";
import {MAX_FILE_SIZE, singleFileUpload, client} from '../utils/aliyun'
import {BadRequest} from "http-errors";

const router = express.Router()

router.post('/aliYun', (req, res) => {
    try {
        singleFileUpload(req, res, async (err) => {
            if (err) failureResponse(res, err)

            if (!req.file) throw new BadRequest('请上传文件')



            successResponse(res, '上传成功')
        })
    } catch (e) {
        failureResponse(res, e)
    }
})

module.exports = router
