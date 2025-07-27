const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

const createCategory = asyncHandler( async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error (error)
    }
});

const update1Category = asyncHandler( async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body,
            {
            new: true,
        }
    );
        res.json(updatedCategory);
    } catch (error) {
        throw new Error (error);
    }
});

const delete1Category = asyncHandler( async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error (error);
    }
});

const get1Category = asyncHandler( async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaCategory = await Category.findById( id );
        res.json(getaCategory);
    } catch (error) {
        throw new Error (error);
    }
});

const getall1Category = asyncHandler( async (req, res) => {
    try {
        const getallCategory = await Category.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error (error);
    }
});

module.exports = { createCategory, update1Category, delete1Category, get1Category, getall1Category };