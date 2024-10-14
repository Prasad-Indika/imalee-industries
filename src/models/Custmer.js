import mongoose from "mongoose";

const custmerSchema = new mongoose.Schema({
    fullName: String,
    contactNo: String,
    email: String,
    address: String,
    username: String,
    password: String,
    orders:[{type:mongoose.Schema.Types.ObjectId, ref:'Order'}]
})

const Custmer = mongoose.models?.Custmer || mongoose.model('Custmer',custmerSchema)
export default Custmer;