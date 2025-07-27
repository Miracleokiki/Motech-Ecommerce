const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { getAllCoupons, createCoupon, updateCoupon, deleteCoupons, getaCoupon } = require("../controllers/couponCtrl");
const router = express.Router();

router.post ("/",authMiddleware, isAdmin, createCoupon);
router.get ("/", getAllCoupons);
router.get ("/:id", getaCoupon);
router.put ("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete ("/:id", authMiddleware, isAdmin, deleteCoupons);

module.exports = router;