const express = require ( "express" );
const { createCategory, updatedCategory, deleteCategory, getCategory, getallCategory } = require("../controllers/blogCategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware, isAdmin, createCategory );
router.put("/:id",authMiddleware, isAdmin, updatedCategory );
router.delete("/:id",authMiddleware, isAdmin, deleteCategory );
router.get("/:id", getCategory );
router.get("/", getallCategory );

module.exports = router;