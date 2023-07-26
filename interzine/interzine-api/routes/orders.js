const express = require("express");
const router = express.Router();
const security = require("../middleware/security");
const Orders = require("../models/orders");

router.post("/create", security.extractUserFromJWT, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const newOrder = await Orders.addOrder({item: req.body, user})
    return res.status(200).json({newOrder})
  } catch (err) {
    next(err);
  }
});

router.get("/previous", security.extractUserFromJWT, async (req, res, next) => {
    try {
        const { user } = res.locals;
        const listOrders = await Orders.listOrders({user})
        return res.status(201).json({listOrders})
    } catch (err) {
        next(err)
    }
})
module.exports = router