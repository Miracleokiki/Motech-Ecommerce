const express = require ("express");
const DbConnect = require('./configs/DbConnect');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const blogRouter = require("./routes/blogRoutes");
const productcategoryRouter = require("./routes/productCategoryRoutes");
const blogcategoryRouter = require("./routes/blogCategoryRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const couponRouter = require("./routes/couponRoutes");

const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
DbConnect();

//app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//app.use("/", (req, res) => {
//   res.send ("Hello from server side......");
//});


app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/productcategory", productcategoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);


app.use(notFound);
app.use(errorHandler);
app.listen(PORT,() => {
    console.log(` 🚀 Server is running on PORT ${PORT}`);
})

//E0WqVIaTtVIeIfeY
//vwDO4qzXup_nG0bVBE4OpvKFd3w