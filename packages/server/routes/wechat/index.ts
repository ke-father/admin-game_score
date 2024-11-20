import express from 'express'
import { successResponse, failureResponse } from '../../utils/response'
const router = express.Router()


router.use('/', require('./auth'))

module.exports = router
