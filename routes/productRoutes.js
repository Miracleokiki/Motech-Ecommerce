const express = require("express");
const { 
    createProduct, 
    getaProduct, 
    getAllProduct, 
    updateProduct1, 
    deleteProduct, 
    getAllProduct1,
    addToWishList,
    rating,
    uploadImages
} = require("../controllers/productCtrls");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images",10),productImgResize, uploadImages);
router.get("/:id", getaProduct);
router.put("/wishlist",authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct1);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);
router.get("/", getAllProduct1);



module.exports = router;