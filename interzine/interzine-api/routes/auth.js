const express = require('express')
const router = express.Router()
const User = require('../models/user')
const ServiceProvider = require('../models/service-provider')



router.post('/user/register', async( req, res, next) => {
    try{
        const user = await User.register(req.body)
        return res.status(201).json({user})
    } catch (err) {
        next(err)
    }
});

router.post('/user/login', async (req, res, next) => {
    try {
        const user = await User.login(req.body)
        return res.status(200).json({user})
    } catch (err) {
        next(err)
    }
})

router.post('/provider/register', async( req, res, next) => {
    try{
        const provider = await ServiceProvider.register(req.body)
        return res.status(201).json({provider})
    } catch (err) {
        next(err)
    }
});

router.post('/provider/login', async (req, res, next) => {
    try {
        const provider = await ServiceProvider.login(req.body)
        return res.status(200).json({provider})
    } catch (err) {
        next(err)
    }
})

module.exports = router