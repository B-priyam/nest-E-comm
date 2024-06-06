import { Module } from '@nestjs/common';
import { ECommController } from './e-comm.controller';
import { ECommService } from './e-comm.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  categorySchema, productSchema, subCategorySchema } from './product.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'Product',schema:productSchema},{name:'Category',schema:categorySchema},{name:'subCategory',schema:subCategorySchema}]),CloudinaryModule],
  controllers: [ECommController],
  providers: [ECommService],
})
export class ECommModule {}
