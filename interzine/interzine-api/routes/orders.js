const express = require("express");
const router = express.Router();
const security = require("../middleware/security");
const Orders = require("../models/orders");

router.post("/create", security.extractUserFromJWT, async (req, res, next) => {
  try {
    const { user } = res.locals;
    console.log('create order', user, req.body)
    // Orders.addOrder({item: req.body.item, user}).then((response)=>{
    //   setTimeout(() => {
    //     console.log('new order', response, new Date())
    //   }, 2000);
    

    // return res.status(200).json({response})

    // })
    const newOrder = await Orders.addOrder({item: req.body.item, user})
    setTimeout(()=>{
    console.log('new order', newOrder, new Date())

    }, 5000)
    return res.status(200).json({newOrder})
  } catch (err) {
    next(err);
  }
});

router.get("/previous", security.extractUserFromJWT, async (req, res, next) => {
    try {
        const { user } = res.locals;
        console.log('previous')
        const listOrders = await Orders.listOrders({user})
        return res.status(201).json({listOrders})
    } catch (err) {
        next(err)
    }
})


module.exports = router