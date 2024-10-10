import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:String,
    description:String,
    unitPrice: String,
    cost:String,
    profit:String,
})

const Product = mongoose.models?.Product || mongoose.model('Product',productSchema)
export default Product;