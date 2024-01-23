const mongoose= require('mongoose')

const productSchema= mongoose.Schema(
    {
        name:{
              type:String, 
              required:[true, "Please enter a product name"]
        },
        quantity:{
            type:Number,
            required:true,
            default:0
        },
        price:{
            type: Number,
            required: [true,"Price is required"],
        },
        image:{
            type:String,
            required:false,
        }

    },
    {timestamps: true} //this will add createdAt and updatedAt fields in our
)

// Lest Create product module
const Product = mongoose.model("Product",productSchema);
module.exports= Product;
