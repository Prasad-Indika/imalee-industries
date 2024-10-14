'use server'

import connectToDB from "@/database";
import Order from "@/models/Order";
import OrderDetails from "@/models/OrderDetails";

export async function saveOrderItemToDB(orderId,orderDetails){

    const {description, qty, unitCost, total, status } = orderDetails

    try {
        await connectToDB();

        const order = await Order.findById(orderId)
        const newOrderItem = new OrderDetails({orderId, description, qty, unitCost, total, status });
        const saveOrderItem = await newOrderItem.save();

        order.orderDetails.push(saveOrderItem._id);
        await order.save();

        if(saveOrderItem){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(saveOrderItem))
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