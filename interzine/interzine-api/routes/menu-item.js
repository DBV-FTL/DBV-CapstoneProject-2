const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu-item");
const ServiceProvider = require("../models/service-provider");
const security = require("../middleware/security");

router.post("/create", security.extractUserFromJWT, async (req, res, next) => {
  console.log('hi')
  try {
    // security.extractUserFromJWT
    console.log('reqqq', req.body, res.locals.user)
    const { user } = res.locals;
    console.log(user)
    const provider = user;
    console.log('prov', provider)
    const newMenuItem = await MenuItem.addMenuItem({
      provider,
      item: req.body,
    });
    console.log('done waiting')
    return res.status(201).json({ newMenuItem });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('?????', id)
    const menuItems = await MenuItem.listMenuItems(id);
    console.log('mi', menuItems)
    return res.status(200).json({ menuItems });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
