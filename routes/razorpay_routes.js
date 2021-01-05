const orders = require("../razorpay/orders.razorpay.controller");
const customers = require("../razorpay/customers.razorpay.controller");
const payment = require("../razorpay/payment.razorpay.controller");
const token = require("../razorpay/token.razorpay.controller");
const express = require("express");
const { create } = require("underscore");
const router = express.Router();

//order api
router.post("/orders/createorder", orders.createOrder);
router.get("/orders/fetchorder/:order_id", orders.fetchOrder);
router.get("/orders/fetchallorders", orders.fetchAllOrder);
router.get(
  "/orders/fetchpaymentbyorderid/:order_id",
  orders.fetchPaymentByOrderId
);

//customers api

router.post("/customers/create", customers.createCustomer);
router.post("/customers/edit", customers.editCustomer);
router.get("/customers/fetch/:customer_id", customers.fetchCustomer);
router.get("/customers/fetchalltokens/:customer_id", customers.fetchAllToken);

//payment api

router.post("/payments/capture", payment.capturePayment);
router.get("/payments/fetch/:payment_id", payment.fetchPaymentById);
router.get("/payments/fetchbyBT/:payment_id", payment.fetchPaymentByBT);
router.get("/payments/fetchall", payment.fetchAllPayments);

//tokens api

router.get("/tokens/fetch/:customer_id/:token_id", token.fetchToken);
router.post("/tokens/delete", token.deleteToken);

module.exports = router;
