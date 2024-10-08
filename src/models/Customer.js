import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    fullName: String,
    contactNo: String,
    email: String,
    address: String,
    username: String,
    password: String
})

const Customer = mongoose.models?.Customer || mongoose.model('Customer',customerSchema)
export default Customer;