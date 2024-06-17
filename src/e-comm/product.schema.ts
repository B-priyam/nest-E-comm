import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class subCategory {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  Products: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Product' }];

  @Prop()
  categoryId: string;
}

export const subCategorySchema = SchemaFactory.createForClass(subCategory);

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  Tags: [string];

  @Prop()
  bannerImage: string;

  @Prop()
  subCategoryId: string;

  @Prop()
  categoryId: string;
}

export const productSchema = SchemaFactory.createForClass(Product);

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  subCategory: [{ type: mongoose.Schema.Types.ObjectId; ref: 'subCategory' }];
}

export const categorySchema = SchemaFactory.createForClass(Category);
