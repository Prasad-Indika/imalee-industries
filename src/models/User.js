import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:String,
    contactNo:String,
    nic:String,
    userName:String,
    password:String,
    role:String  // admin , staff , stock
})

const User = mongoose.models?.User || mongoose.model('User',userSchema)
export default User;