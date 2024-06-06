import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { categorySchema, productSchema, subCategorySchema } from 'src/e-comm/product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'subCategory',schema:subCategorySchema},{name:'Category',schema:categorySchema},{name:'Product',schema:productSchema}])],
  controllers:[SubCategoryController],
  providers: [SubCategoryService],

})
export class SubCategoryModule {}
