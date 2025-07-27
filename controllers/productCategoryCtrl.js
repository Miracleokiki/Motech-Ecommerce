const Category = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create( req.body );
        res.json(newCategory);
    } catch (error) {
        throw new Error( error );
    }

});

const updatedCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(updateCategory);
    } catch (error) {
        throw new Error( error );
    }

});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error( error );
    }

});

const getCategory = asyncHandler(async (req, res) => {
     const { id } = req.params;
     validateMongoDbId(id); 
    try {
        const getaCategory = await Category.findById(id);
        res.json(getaCategory);
    } catch (error) {
        throw new Error( error );
    }

});

const getallCategory = asyncHandler(async (req, res) => { 
    try {
        const getalLCategory = await Category.find();
        res.json(getalLCategory);
    } catch (error) {
        throw new Error( error );
    }

});


module.exports = { createCategory, updatedCategory, deleteCategory, getCategory, getallCategory };