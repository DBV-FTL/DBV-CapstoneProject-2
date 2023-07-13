const express = require('express')
const router = express.Router()
const MenuItem = require('../models/menu-item')
const security = require('../middleware/security')

router.post('/create', security.extractUserFromJWT,async (req, res, next) => {
    try {
        const { user } = res.locals
        const provider = user
        const  newMenuItem  = await MenuItem.addMenuItem({ provider, item: req.body})
        return res.status(200).json({newMenuItem})
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const id = req.params['id'];
        const menuItems = await MenuItem.listMenuItems(id)
        return res.status(200).json({menuItems})
    } catch (err) {
        next(err)
    }
})

module.exports = router
