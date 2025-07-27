const express = require ("express");
const { createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updateaUser, 
    blockUser, 
    unblockUser, 
    handleRefreshToken, 
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getwishlist,
    saveAddress,
    userCart,
} = require("../models/userCtrl");
const {authMiddleware, isAdmin }= require("../middlewares/authMiddleware");
const router = express.Router();



router.post('/register', createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post('/admin-login', loginAdmin);
router.post('/cart',authMiddleware, userCart);
router.get("/all-users", getallUser);
router.get("/refresh",authMiddleware,isAdmin, handleRefreshToken);
router.get("/logout",authMiddleware,isAdmin, logout);
router.get("/wishlist", authMiddleware,getwishlist);

router.get("/:id", authMiddleware,isAdmin,getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user",authMiddleware, updateaUser);
router.put("/save-address",authMiddleware, saveAddress);
router.put("/block-user/:id",authMiddleware,isAdmin, blockUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser);

module.exports = router;