const express = require("express");
const router = express.Router();
const generateAuthToken = require("../utils/tokens");
const User = require("../models/user");
const ServiceProvider = require("../models/service-provider");
const security = require('../middleware/security')



router.post('/user/register', async( req, res, next) => {
    try{
        const user = await User.register(req.body)
        const token = generateAuthToken({...user, client:'user'})
        return res.status(201).json({user, token})
    } catch (err) {
        next(err)
    }
});

router.post("/user/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = generateAuthToken({...user, client:'user'});
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.put("/user", security.extractUserFromJWT, async (req, res, next) => {
    try {
        const { user } = res.locals
        const updatedUser = await User.updateZipCode(user, req.body);
        return res.status(200).json({updatedUser})
    } catch (err) {
        next(err)
    }
})

router.post("/provider/register", async (req, res, next) => {
  try {
    const provider = await ServiceProvider.register(req.body);
    const token = generateAuthToken({...provider, client: 'provider'});
    return res.status(201).json({ provider, token });
  } catch (err) {
    next(err);
  }
});

router.post("/provider/login", async (req, res, next) => {
  try {
    const provider = await ServiceProvider.login(req.body);
    const token = generateAuthToken({...provider, client: 'provider'});
    return res.status(200).json({ provider, token });
  } catch (err) {
    next(err);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const { user } = res.locals;
    const providers = await User.fetchProviderByZipCode(user);
    return res.status(200).json({ providers });
  } catch (err) {
    next(err);
  }
});

router.get("/provider/cuisine", async (req, res, next) => {
    try {
      const providers = await ServiceProvider.fetchProviderByCuisine(req.body);
      return res.status(200).json({ providers });
    } catch (err) {
      next(err);
    }
  });
  
  router.get("/provider", async (req, res, next) => {
    try {
      const providers = await ServiceProvider.fetchAllProviders();
      return res.status(200).json({ providers });
    } catch (err) {
      next(err);
    }
  });


router.post("/verify", security.extractUserFromJWT, (req, res) => {
    try {
        const {user}= res.locals
        return res.status(200).json({user})
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;
