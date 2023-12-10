const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { purchase_premium } = require("../controllers/purchase");

const router = express.Router();


router.get("/purchase-premium",authenticate,purchase_premium)


module.exports = router;
