const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});


router.post("/create-payment-intent", async (req, res, next) => {
  try {
    const {amount} = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).send({clientSecret: paymentIntent.client_secret})
  } catch (err) {
    next(err);
  }
});

module.exports = router;
