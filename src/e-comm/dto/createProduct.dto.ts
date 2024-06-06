import mongoose, { ObjectId } from "mongoose";

export class createProductDto {
    _id:ObjectId;
    name: string ;
    description:string;
    price: number;
    Tags : string[];
    bannerImage : Express.Multer.File;
    subCategoryId: string
    CategoryId: string
}

export class createSubCategoryDto {
    _id:ObjectId;
    categoryId:[{type:mongoose.Types.ObjectId,ref:"createCategoryDto"}]
    name : string;
    products : createProductDto[]
}

export class createCategoryDto {
    _id:ObjectId;
    name : string;
    subCategory : createSubCategoryDto[]
}

