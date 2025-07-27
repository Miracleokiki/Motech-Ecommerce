const { generateToken } = require("../configs/jwtToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../configs/refreshToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
//const { errorHandler } = require("../middlewares/errorHandler");
const sendEmail = require("../controllers/emailCtrl");


//create  a user
const createUser = asyncHandler(
    async (req,res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser) {
        //create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else {
        throw new Error ("User Already Exists");
        //user already exist
        //res.json({
         //   msg: "User Already Exists",
          //  success: false,
        //});
    };

}
);
//Login a user
const loginUserCtrl = asyncHandler (
    async (req, res) => {
        const { email, password } = req.body;
        //checking what we getting from email & password
       // console.log (email, password);
       //check  if user exist or not 
       const findUser = await User.findOne({ email });
       if(findUser && (await findUser.isPasswordMatched(password))) {
        //res.json(findUser);
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id, 
            {
            refreshToken:refreshToken,
        },
      {
        new: true
      }
    );
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000
       });

        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?.id),
        });
       } else {
        throw new Error ("Invalid Credentials");
       }

    }
);

//Admin Login
const loginAdmin = asyncHandler (
    async (req, res) => {
        const { email, password } = req.body;
        //checking what we getting from email & password
       // console.log (email, password);
       //check  if user exist or not 
       const findAdmin = await User.findOne({ email });
       if(findAdmin.role !== "admin") throw new Error("Not Authorized");
       if(findAdmin && (await findAdmin.isPasswordMatched(password))) {
        //res.json(findUser);
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(
            findAdmin.id, 
            {
            refreshToken:refreshToken,
        },
      {
        new: true
      }
    );
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000
       });

        res.json({
            _id: findAdmin?._id,
            firstName: findAdmin?.firstName,
            lastName: findAdmin?.lastName,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?.id),
        });
       } else {
        throw new Error ("Invalid Credentials");
       }

    }
);

//Get all users
const getallUser = asyncHandler (async (req, res) => {
    try {
       const getUsers = await User.find();
       res.json({getUsers}); 
    } catch (error) {
        throw new Error(error);
    }
})

//Get a single user
const getaUser = asyncHandler (async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    //console.log(id);
    //console.log ( req.params ); 
    try {
        const getaUser =await User.findById(id);
        res.json({ 
            getaUser,
        })
    } catch (error) {
       throw new Error(error); 
    }
});

//handle refreshToken
const handleRefreshToken = asyncHandler(async(req,res) => {
    const cookie = req.cookies
    console.log(cookie);
    if(!cookie.refreshToken) throw new Error(" No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No refresh Token present in db, ur not matched");
    //res.json(user);
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
         //console.log(decoded);
         if(err || user.id !== decoded.id) {
            throw new Error(" There is something wrong with refresh Token ");
         }
         //providing new acess token
         const accessToken = generateToken(user?._id);
         res.json(accessToken);
    });
});

//logout functionality
const logout = asyncHandler(async(req,res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        res.sendStatus(204); // fobidden
});

//update a user 
const updateaUser = asyncHandler (async (req,res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateaUser = await User.findByIdAndUpdate(_id, {
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },{
            new: true,
        }
    );
    res.json(updateaUser);
    } catch (error) {
        throw new Error(error);
    }
});


//save address
const saveAddress = asyncHandler (async (req,res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateaUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,
        },{
            new: true,
        }
    );
    res.json(updateaUser);
    } catch (error) {
        throw new Error(error);
    }
});

//delete a single user
const deleteaUser = asyncHandler (async (req, res) => {
    const {id} = req.params;
     validateMongoDbId(id);
    //console.log(id);
    //console.log ( req.params ); 
    try {
        const deleteaUser =await User.findByIdAndDelete(id);
        res.json({ 
            deleteaUser,
        })
    } catch (error) {
       throw new Error(error); 
    }
});

const blockUser = asyncHandler (async (req,res) => {
    const { id } = req.params;
     validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(id,{
            isBlocked: true,
        },{
            new: true,
        });
        res.json ({
            message: block
        });
    } catch (error) {
        throw new Error(error);
    }
});
const unblockUser = asyncHandler (async (req,res) => {
    const { id } = req.params;
     validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id,{
            isBlocked: false,
        },{
            new: true,
        });
        res.json({
    message: unblock
});
    } catch (error) {
        throw new Error(error);
    }
}); 

const updatePassword = asyncHandler (async (req, res) => {
    console.log(req.body);
    const { _id } = req.user;
    const { password }= req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if(password){
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});

//generating token
/*const forgotPasswordToken = asyncHandler( async (req, res) => {

    
    
    /*const { email }  = req.body;
    const user = await User.findOne({ email });
    if( !user ) throw new Error (" User not found with this email ");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to  reset your password. This link is valid for just 10 minutes from now. 
        <a href="http://localhost:5000/api/user/reset-password/${token}">Click Here</a>`
        const data = {
            to: email,
            text: "Hey User",
            subject : "Forgot Password Link",
            html: resetURL,
        };

         await sendEmail(data);
        //res.json();
        res.json({ message: "Reset link sent to your email", token });
    } catch (error) {
        throw new Error(error);    
    }

});*/

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");

  const token = await user.createPasswordResetToken(); // assume this is defined in user schema
  await user.save();

  const resetURL = `
    <p>Hello ${user.name},</p>
    <p>Please click the link below to reset your password. This link is valid for 10 minutes:</p>
    <a href="http://localhost:5000/api/user/reset-password/${token}">Reset Password</a>
  `;

  const mailData = {
    to: email,
    subject: "Reset Your Password",
    text: "Reset your password",
    html: resetURL,
  };

  await sendEmail(mailData);
  res.json({ message: "Reset link sent to email", token });
});


//generating resetPassword
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne ({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error (" Token Expired, Please try again later ");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getwishlist = asyncHandler ( async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const findUser = await User.findById(_id).populate("wishlist"); 
      res.json(findUser); 
    } catch (error) {
        throw new Error(error);
    }
});

//userCart
const userCart = asyncHandler(async (req,res,) => {
    //res.send("Hello free cart")
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        let products =[];
       const user = await User.findById(_id);
       //check if user Already has product in cart
       const alreadyExistCart = await Cart.findOne({orderby: user._id});
       if(alreadyExistCart){
        alreadyExistCart.remove();
       }
       for (let i = 0; i<cart.length; i++){
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        let getPrice = await Product.findById(cart[i]._id).select("price").exec();
        object.price = getPrice.price;
        products.push(object);
       }
       console.log(products);
    } catch (error) {
        throw new Error (error);
    }
    });

module.exports =
{ 
    createUser, 
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
}