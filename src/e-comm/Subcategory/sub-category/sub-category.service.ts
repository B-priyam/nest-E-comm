import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { createSubCategoryDto } from 'src/e-comm/dto/createProduct.dto';
import { Category, Product, subCategory } from 'src/e-comm/product.schema';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(subCategory.name)
    private subCategoryModel: Model<subCategory>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    @InjectModel(Product.name)
    private ProductModal: Model<Product>,
  ) {}

  async getAllSubCategories(id: any) {
    const arrayOfId = [];
    arrayOfId.push(id.split(','));
    for (let i = 0; i < arrayOfId.length; i++) {
      const data = await this.subCategoryModel.find({
        categoryId: arrayOfId[i],
      });
      return data;
    }
  }

  async createSubCategory(subcategory: createSubCategoryDto) {
    const findSubCategory = await this.subCategoryModel.find({
      categoryId: subcategory.categoryId,
      name: subcategory.name,
    });
    if (findSubCategory.length > 0) {
      return {
        status: 400,
        message: 'sub category already exists',
      };
    }
    const createSubCategory = await this.subCategoryModel.create(subcategory);
    const findCategory = await this.categoryModel.updateOne(
      { _id: subcategory.categoryId },
      {
        $push: {
          subCategory: createSubCategory._id,
        },
      },
    );
    if (createSubCategory && findCategory) {
      return {
        status: 200,
        message: 'sub category created successfully',
      };
    }
  }

  async deleteSubCategory(data: any) {
    data.flatMap(async (val: any) => {
      const { _id, categoryId } = val;
      const deleteSubCategory =
        await this.subCategoryModel.findByIdAndDelete(_id);
      const deleteFromProducts = await this.ProductModal.deleteMany({
        subCategoryId: _id,
      });
      const deleteSubcategoryId = await this.categoryModel.updateOne(
        { _id: categoryId },
        {
          $pull: {
            subCategory: new mongoose.Types.ObjectId(_id.toString()),
          },
        },
      );
      if (deleteSubCategory && deleteSubcategoryId && deleteFromProducts) {
        return {
          status: 200,
          message: 'Sub category deleted successfully',
        };
      }
    });
  }

  async updateSubCategory(data: any) {
    const editCategory = await this.subCategoryModel.updateOne(
      { _id: data._id },
      {
        $set: {
          name: data.name,
          description: data.description,
        },
      },
    );
    if (editCategory) {
      return {
        status: 200,
        message: 'category name updated successfully',
      };
    }
  }
}
