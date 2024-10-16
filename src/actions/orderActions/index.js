'use server'

import connectToDB from "@/database";
import Customr from "@/models/Customr";
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

export async function updateOrderCompleteToDB(orderId,updateOrder) {
    const { status , totolAmount , paidAmount, completeDate } = updateOrder
    
    try {
        await connectToDB();
        
        const updateOrder = await Ordr.findByIdAndUpdate(orderId,{status , totolAmount , paidAmount, completeDate},{new:true});
       
        if(updateOrder){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(updateOrder))
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

export async function getOrderByIdFromDB(orderId) {
    try {
        await connectToDB();
        
        const order = await Ordr.findById(orderId).populate('customer').lean();

        if (order) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(order))
            };
        } else {
            return {
                success: false,
                message: 'Order not found'
            };
        }

    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
