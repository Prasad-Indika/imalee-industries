'use server'

import connectToDB from "@/database";
import Customr from "@/models/Customr";

export async function savecustomerToDB(customer){

    const { fullName, contactNo , email , address , username , password } = customer

    try {
        await connectToDB();

        const newCustomer = new Customr({ fullName, contactNo , email , address , username , password })
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
        const customers = await Customr.find();
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
        
        const updateData = await Customr.findByIdAndUpdate(id, updateCustomer, { new: true });

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

        const deleteCustomer = await Customr.findByIdAndDelete(id);
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



