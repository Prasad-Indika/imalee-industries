import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
    order:{type:mongoose.Schema.Types.ObjectId,ref:'Order'},
    description:String,
    qty:String,
    unitCost:String,
    total:String,
    status:String,
})

const OrderDetails = mongoose.models?.OrderDetails || mongoose.model('OrderDetails',orderDetailsSchema)
export default OrderDetails;
