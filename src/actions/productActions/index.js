'use server'

import connectToDB from "@/database";
import Product from "@/models/Product";

export async function saveProductToDB(product){

    const { productName , description , unitPrice , cost , profit } = product

    try {
        await connectToDB();

        const newProduct = new Product({productName , description , unitPrice , cost , profit})
        const saveProductr = await newProduct.save();
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

export async function getAllProductsFromDB(){
    try {
        await connectToDB();
        const products = await Product.find();
        if(products){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(products))
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

export async function updateProductFromDB(id,updateProduct){
   
    try {
        await connectToDB();
        
        const updateData = await Product.findByIdAndUpdate(id, updateProduct, { new: true });

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

export async function deleteProductFromDB(id){
    try {
        await connectToDB();

        const deleteProduct = await Product.findByIdAndDelete(id);
        if(deleteProduct){
            return {
                success:true,
                data: JSON.parse(JSON.stringify(deleteProduct))
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
