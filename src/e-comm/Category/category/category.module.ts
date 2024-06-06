import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema, productSchema, subCategorySchema } from 'src/e-comm/product.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Category',schema:categorySchema},{name:'subCategory',schema:subCategorySchema},{name:'Product',schema:productSchema}])],
  controllers:[CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
