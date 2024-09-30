'use server'

import connectToDB from "@/database"
import User from "@/models/User";

export async function saveUserToDB(user){

    const { fullName, contactNo, nic, userName, password , role} = user

    try {
        await connectToDB();

        const newUser = new User({fullName, contactNo, nic, userName, password , role})
        const saveUser = await newUser.save();
        if(saveUser){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(saveUser))
            }
        }else {
            return {
                success:false,
                message:'Failed to save user. Please try again'
            }
        }


    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export async function userLoin(loginDetails){
    const {userName , password} = loginDetails
    try {
        await connectToDB();
        const checkUser = await User.findOne({userName});
        if(checkUser){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(checkUser))
            }
        }else {
            return {
                success:false,
                message:'No user Found'
            }
        }

    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}


export async function getAllUsersFromDB(){
    try {
        await connectToDB();
        const users = await User.find();
        if(users){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(users))
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