'use server'

import connectToDB from "@/database";
import Customer from "@/models/Customer";

export async function savecustomerToDB(customer){

    const { fullName, contactNo , email , address , username , password } = customer

    try {
        await connectToDB();

        const newCustomer = new Customer({ fullName, contactNo , email , address , username , password })
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

