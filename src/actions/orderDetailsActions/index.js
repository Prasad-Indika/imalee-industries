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

export async function updateOrderItemToDB(orderItemId,updateditem){

    const { description, qty ,unitPrice,total,status } = updateditem
    
    try {
        await connectToDB();
        
        const updateItem = await Odritm.findByIdAndUpdate(orderItemId,{ description, qty ,unitPrice,total,status},{new:true});
       
        if(updateItem){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(updateItem))
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

export async function updateOrderItemStatusToDB(orderItemId){
    
    try {
        await connectToDB();
        
        const updateItem = await Odritm.findByIdAndUpdate(orderItemId,{status:'complete'},{new:true});
       
        if(updateItem){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(updateItem))
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

export async function deleteOrderItemFromDB(orderItemId,orderId) {
    try {
        await connectToDB();

        const deletedItem = await Odritm.findByIdAndDelete(orderItemId);

        await Ordr.findByIdAndUpdate(orderId, {
            $pull: { orderItems: orderItemId }
        });

        if (deletedItem) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(deletedItem))
            };
        } else {
            return {
                success: false,
                message: 'Failed to delete the order item'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
