'use server'

import connectToDB from "@/database";
import Custmer from "@/models/Custmer";
// import Customer from "@/models/Customer";

export async function savecustomerToDB(customer){

    const { fullName, contactNo , email , address , username , password } = customer

    try {
        await connectToDB();

        const newCustomer = new Custmer({ fullName, contactNo , email , address , username , password })
        const saveCustomer = await newCustomer.save();
        if(saveCustomer){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(saveCustomer))
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

export async function getAllCustomersFromDB(){
    try {
        await connectToDB();
        const customers = await Custmer.find();
        if(customers){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(customers))
            }
        }else {
            return {
                success:false,
                message:'Error. Please try again'
            }
        }
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export async function updateCustomerFromDB(id,updateCustomer){
    
    try {
        await connectToDB();
        
        const updateData = await Custmer.findByIdAndUpdate(id, updateCustomer, { new: true });

        if(updateData){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(updateData))
            }
        }else{
            return {
                success:false,
                message:'Something Went whrong | Not Added'
            }
        }
    } catch (error) {
        return {
            success:false,
            message: error.message
        }
    }
}

export async function deleteCustomerFromDB(id){
    try {
        await connectToDB();

        const deleteCustomer = await Custmer.findByIdAndDelete(id);
        if(deleteCustomer){
            return {
                success:true,
                data: JSON.parse(JSON.stringify(deleteCustomer))
            }
        }else{
            return {
                success:false,
                message: "Error"
            }
        }

    } catch (error) {
        return {
            success:false,
            message: error.message
        }
    }
}



