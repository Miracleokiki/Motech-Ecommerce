const express = require ( "express" );
const { createBrand, updatedBrand, deleteBrand, getBrand, getallBrand } = require("../controllers/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware, isAdmin, createBrand );
router.put("/:id",authMiddleware, isAdmin, updatedBrand );
router.delete("/:id",authMiddleware, isAdmin, deleteBrand );
router.get("/:id", getBrand );
router.get("/", getallBrand );

module.exports = router;