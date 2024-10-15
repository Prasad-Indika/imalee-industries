import mongoose from "mongoose";

const ordrSchema = new mongoose.Schema({

    customer:{type:mongoose.Schema.Types.ObjectId,ref:'Customr'},

    description:String,
    status:String,
    totolAmount:String,
    paidAmount:String,
    orderDate:String,
    completeDate:String,

    orderItems:[{type:mongoose.Schema.Types.ObjectId, ref:'Odritm'}]

})

const Ordr = mongoose.models?.Ordr || mongoose.model('Ordr',ordrSchema)
export default Ordr;

// Correct