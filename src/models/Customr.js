import mongoose from "mongoose";

const customrSchema = new mongoose.Schema({
    fullName: String,
    contactNo: String,
    email: String,
    address: String,
    username: String,
    password: String,
    orders:[{type:mongoose.Schema.Types.ObjectId, ref:'Ordr'}]
})

const Customr = mongoose.models?.Customr || mongoose.model('Customr',customrSchema)
export default Customr;

// Correct