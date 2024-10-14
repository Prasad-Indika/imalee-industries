import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    customer:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'},

    description:String,
    status:String,
    totolAmount:String,
    paidAmount:String,
    orderDate:String,
    completeDate:String,

    orderDetails:[{type:mongoose.Schema.Types.ObjectId, ref:'OrderDetails'}]

})

const Order = mongoose.models?.Order || mongoose.model('Order',orderSchema)
export default Order;