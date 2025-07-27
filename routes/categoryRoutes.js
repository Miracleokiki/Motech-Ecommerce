const express = require ("express");
const { createCategory, update1Category, delete1Category, get1Category, getall1Category } = require("../controllers/categoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, update1Category);
router.delete("/:id", authMiddleware, isAdmin, delete1Category);
router.get("/:id", get1Category);
router.get("/", getall1Category);


module.exports = router;