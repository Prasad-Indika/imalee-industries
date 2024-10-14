'use server'

import connectToDB from "@/database";
import Custmer from "@/models/Custmer";
import Order from "@/models/Order";

export async function saveOrderToDB(customer,order){

    const { description , status , totolAmount , paidAmount, orderDate , completeDate } = order

    try {
        await connectToDB();

        const custmer = await Custmer.findById(customer)
        const newOrder = new Order({customer,  description , status , totolAmount , paidAmount, orderDate , completeDate });
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
        const res = await Client.find().populate('orders').lean();

        if(res.length > 0){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(res))
            }
        }else {
            return {
                success:false,
                message:'Some Error occur'
            }
        }

    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export async function getOrderByIdFromDB(id) {
    
}