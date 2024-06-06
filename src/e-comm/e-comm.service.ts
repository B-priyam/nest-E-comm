import { Injectable } from '@nestjs/common';
// import {  createProductDto } from './dto/createProduct.dto';
import {   Product, subCategory } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ECommService {
    constructor(
        @InjectModel(Product.name)
        private productModal:Model<Product>,
        @InjectModel(subCategory.name)
        private subcategoryModal:Model<subCategory>,
        private readonly cloudinary: CloudinaryService
    ) {}

    async getAllProducts(){
        return await this.productModal.find();
    }

    async create(data:any,id:string) {
        if(data.name){
            
                const findProduct = await this.productModal.find({subCategoryId:data.subCategoryId,
                    name:data.name})
                    
                    if(findProduct.length > 0){
                        return {
                            status:401,
                            message:'Product already exists'
                        }
                    }
                    
                    const createProduct = await this.productModal.create(data)
                    
                    await this.subcategoryModal.updateOne({_id:data.subCategoryId}
                        ,{
                            $push:
                            {
                                "Products":createProduct._id
                            }
                        })
                        return createProduct
                    
            }
            if(data.fieldname){
                    const uploadImage = await this.cloudinary.uploadFile(data)
                    await this.productModal.updateOne({_id:id},{
                        $set:{
                            bannerImage: uploadImage.secure_url
                        }
                    }
                )
                if(uploadImage.secure_url){
                    return {
                        status:200,
                        message:'Image uploaded successfully'
                        }
                }
    }
}

    async deleteProduct(data:any){

         await this.cloudinary.updater(data.secure_url,"C:\\Users\\cmoko\\OneDrive\\Pictures\\illusion.png")

        const deleted = await this.productModal.deleteOne({_id:data._id})
        if(deleted.deletedCount > 0){
            await this.cloudinary.deleteFile(data.secure_url)
            const deleteFromSubcategory = await this.subcategoryModal.updateOne({_id:data.subCategoryId},{
                $pull:{
                    "Products":new mongoose.Types.ObjectId(data._id.toString())
                }
            })
            if(deleteFromSubcategory.modifiedCount > 0){
                return {
                    status:200,
                    message:"product deleted successfully"
                }
            }
        }
        
        return {
            status:400,
            message:"some error occured"
        }
      }

      async updateImage(_id:string,data:any){
        if(data.fieldname){
            const updateImage  = await this.cloudinary.uploadFile(data)
            if(updateImage.secure_url){
                const updateProduct = await this.productModal.updateOne({_id:_id},{
                    $set:{
                        bannerImage:updateImage.secure_url
                    }
                })
                if(updateProduct){
                    return {
                        status:200,
                        message:"image updated successfully"
                    }
                }else{
                    return {
                        status:400,
                        message:"error in updating image"
                    }
                }
            }
            else{
                return {
                    status:400,
                    message:"error in updating image"
                }
            }
        }
        
      }

      async updateProduct(data:any){
        const updateProduct = await this.productModal.updateOne({_id:data._id},{
            $set:{
                name:data.name,
                description:data.description,
                price:data.price,
                Tags:data.Tags
            }
        })
        if(updateProduct.modifiedCount > 0){
            return {
                status:200,
                message:"product updated successfully"
            }
        }else{
            return {
                status:400,
                message:"error in updating product"
            }
        }
      }
}
