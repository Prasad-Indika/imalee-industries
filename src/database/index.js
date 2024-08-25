import mongoose from "mongoose";

const connectToDB = async ()=>{
    const connectURL ="mongodb+srv://prasadhotmail:RNYATe2EPdLM4Kzb@imaleedb.rp0ca.mongodb.net/"
    mongoose.connect(connectURL)
    .then(()=>(console.log("Connect Success")))
    .catch((err)=>(console.log(err)))
}

export default connectToDB;