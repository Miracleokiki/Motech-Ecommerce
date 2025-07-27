const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    //category:{
    //   type: mongoose.Schema.Types.ObjectId,
    // ref:"Category",
    //},
    category:{
        type: String,
        required: true,
    },
    //brand: {
    //    type:String,
    //    enum: ["Apple", "Samsung", "Lenovo"],
    //},
    brand: {
        type:String,
        required:true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    sold: {
        type:Number,
        default:0,
    },
    images:[],
    //color:{
    //    type:String,
    //    enum:["Black", "Brown", "Red"],
    //},
    color:{
        type:String,
        required:true,
    },
    ratings:[{
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
],
totalratings: {
    type: String,
    default: 0,
}
},
{timestamps: true}
);

//Export the model
module.exports = mongoose.model('Product', productSchema);