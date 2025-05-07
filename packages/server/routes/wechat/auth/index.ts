import express from 'express'
const router = express.Router()

router.use('/login', require('./login'))

router.use('/checkSession', require('./checkSession'))

module.exports = router
