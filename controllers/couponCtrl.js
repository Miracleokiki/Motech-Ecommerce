const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler ( async ( req, res ) => {
    try {
       const newCoupon = await Coupon.create(req.body);
       res.json( newCoupon ); 
    } catch (error) {
        throw new Error ( error );
    }
});

const getaCoupon = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const getCoupon = await Coupon.findById(id);
        res.json(getCoupon);
    } catch (error) {
        throw new Error ( error);
    }
});

const getAllCoupons = asyncHandler ( async ( req, res ) => {
    try {
       const coupons = await Coupon.find();
       res.json( coupons ); 
    } catch (error) {
        throw new Error ( error );
    }
});

const updateCoupon = asyncHandler ( async ( req, res ) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
       const updatedcoupons = await Coupon.findByIdAndUpdate(id,req.body, 
        {
        new: true,
       }
    );
       res.json( updatedcoupons ); 
    } catch (error) {
        throw new Error ( error );
    }
});

const deleteCoupons = asyncHandler ( async ( req, res ) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
       const deletedCoupons = await Coupon.findByIdAndDelete(id);
       res.json( deletedCoupons ); 
    } catch (error) {
        throw new Error ( error );
    }
});


module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupons, getaCoupon };