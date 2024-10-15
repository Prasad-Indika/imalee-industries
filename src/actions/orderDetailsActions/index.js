'use server'

import connectToDB from "@/database";
import Odritm from "@/models/Odritm";
// import Order from "@/models/Order";
// import Orderitem from "@/models/Orderitem";
import Ordr from "@/models/Ordr";

export async function saveOrderItemToDB(order,orderitem){

    const { description, qty ,unitPrice,total,status } = orderitem
    
    
    try {
        await connectToDB();

        const odr = await Ordr.findById(order);
        const newItem = new Odritm({description, qty , unitPrice, total, status , order })
        const saveProductr = await newItem.save();

        odr.orderItems.push(saveProductr._id);
        odr.save();
        
        if(saveProductr){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(saveProductr))
            }
        }else {
            return {
                success:false,
                message:'Failed to save. Please try again'
            }
        }


    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export async function getItemsByOrderFromDB(order) {
    try {
        await connectToDB();
        const res = await Odritm.find({ order: order }).lean();

        if(res){
            console.log("ok");
            
            return {
                success:true,
                data:JSON.parse(JSON.stringify(res))
            }
        }else {
            console.log("error");
            return {
                success:false,
                message:'Some Error occur'
            }
        }

    } catch (error) {
        console.log("errorrss",error.message);
        return {
            success:false,
            message:error.message
        }
    }
}