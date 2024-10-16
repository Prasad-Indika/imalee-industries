'use server'

import connectToDB from "@/database"
import User from "@/models/User";
import jwt from 'jsonwebtoken'; 

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

export async function userLogin(loginDetails){
    const {userName,password} = loginDetails;

    try {
        await connectToDB();
        const checkUser = await User.findOne({userName});
        if(!checkUser){
            return {
                success:false,
                message:'Invalid User'
            }
        }

        if(password !== checkUser.password){
            return {
                success:false,
                message:'Invalid Password'
            }
        }

        const tokenData = {
            id:checkUser._id,
            userName:checkUser.userName
        }

        const token = jwt.sign(tokenData,"DEAFULT_KEY",{expiresIn:"1d"})
        
        return {
            success:true,
            token:token
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