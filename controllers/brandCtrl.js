const Brand = require("../models/brandModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create( req.body );
        res.json(newBrand);
    } catch (error) {
        throw new Error( error );
    }

});

const updatedBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const newBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(updatedBrand);
    } catch (error) {
        throw new Error( error );
    }

});

const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error( error );
    }

});

const getBrand = asyncHandler(async (req, res) => {
     const { id } = req.params;
     validateMongoDbId(id); 
    try {
        const getaBrand = await Brand.findById(id);
        res.json(getaBrand);
    } catch (error) {
        throw new Error( error );
    }

});

const getallBrand = asyncHandler(async (req, res) => { 
    try {
        const getalLBrand = await Brand.find();
        res.json(getalLBrand);
    } catch (error) {
        throw new Error( error );
    }

});



module.exports = { createBrand, updatedBrand, deleteBrand, getBrand, getallBrand };