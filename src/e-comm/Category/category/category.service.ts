import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { createCategoryDto } from 'src/e-comm/dto/createProduct.dto';
import { Category, Product, subCategory } from 'src/e-comm/product.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private CategoryModal:Model<Category>,
        @InjectModel(subCategory.name)
        private SubCategoryModal:Model<subCategory>,
        @InjectModel(Product.name)
        private ProductModal:Model<Product>
    ){}

    async createCategory(data:createCategoryDto){
        const alreadyPresent = await this.CategoryModal.findOne({name:data.name})
        if(alreadyPresent)
            {
                return {
                    status:400,
                    message:"category name already present"
                }
            }
        else{
            const createCategory = await this.CategoryModal.create(data)
            if(createCategory)
            return {
                status:400,
                message:"category created successfully"
        }
        }
    }

    async getCategories(){
        const categories = await this.CategoryModal.find()
        return categories
    }

    async deleteCategory(id:ObjectId){
        const deleteCategory = await this.CategoryModal.findByIdAndDelete({_id:id})
        const deleteFromSubcategory = await this.SubCategoryModal.deleteMany({categoryId:id})
        const deleteFromProducts = await this.ProductModal.deleteMany({categoryId:id})
        
        if(deleteCategory && deleteFromSubcategory && deleteFromProducts)
            {
                return {
                    status:200,
                    message:"category deleted successfully"
                }
            }
        }

    async editCategory(data:any){
        const editCategory = await this.CategoryModal.updateOne({_id:data._id},
           { $set:{
            name:data.categoryName,
        }
    })
    if(editCategory){
        return {
            status:401,
            "message":"category name updated successfully"
        }
    }    
    }

}
