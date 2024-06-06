import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ECommModule } from './e-comm/e-comm.module';
import {CloudinaryService} from "./cloudinary/cloudinary.service"
import { ImageController } from './cloudinary/image.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './e-comm/Category/category/category.module';
import { SubCategoryModule } from './e-comm/Subcategory/sub-category/sub-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal: true,
    }),
    ECommModule,
    CategoryModule,
    SubCategoryModule,
    CloudinaryModule,
    MongooseModule.forRoot("mongodb+srv://priyam3801h:priyam123@cluster0.2in6jmv.mongodb.net/learnnest")
  ],

  controllers: [AppController,ImageController],
  providers: [AppService,CloudinaryService],
})
export class AppModule {}
