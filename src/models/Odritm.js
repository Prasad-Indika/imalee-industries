import mongoose from "mongoose";

const odritmSchema = new mongoose.Schema({
    description:String,
    qty:String,
    unitPrice:String,
    total:String,
    status:String,
    order:{type:mongoose.Schema.Types.ObjectId,ref:'Ordr'}
})

const Odritm = mongoose.models?.Odritm || mongoose.model('Odritm',odritmSchema)
export default Odritm;

// Correct