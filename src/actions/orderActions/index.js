'use server'

import connectToDB from "@/database";
import Customr from "@/models/Customr";
// import Custmer from "@/models/Custmer";
// import Order from "@/models/Order";
import Ordr from "@/models/Ordr";

export async function saveOrderToDB(customer,order){

    const { description , status , totolAmount , paidAmount, orderDate , completeDate } = order

    try {
        await connectToDB();

        const custmer = await Customr.findById(customer)
        const newOrder = new Ordr({customer,  description , status , totolAmount , paidAmount, orderDate , completeDate });
        const saveOrder = await newOrder.save();

        custmer.orders.push(saveOrder._id);
        await custmer.save();

        if(saveOrder){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(saveOrder))
            }
        }else {
            return {
                success:false,
                message:'Failed to save Customer. Please try again'
            }
        }

    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export async function getAllOrdersFromDB() {
    try {
        await connectToDB();
        const res = await Ordr.find().populate('customer').populate('orderItems').lean();

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

export async function getPendingOrdersFromDB() {
    try {
        await connectToDB();
        const res = await Ordr.find({ status: 'pending' }).populate('customer').populate('orderItems').lean();

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

export async function getCompleteOrdersFromDB() {
    try {
        await connectToDB();
        const res = await Ordr.find({ status: 'complete' }).populate('customer').populate('orderItems').lean();

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

export async function getOrderByIdFromDB(id) {
    
}
