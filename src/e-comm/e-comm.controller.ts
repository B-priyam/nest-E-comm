import {  Body, Controller, Get,  Param,  Post, UploadedFile, UseInterceptors} from '@nestjs/common';
// import { createCategoryDto, createProductDto, createSubCategoryDto } from './dto/createProduct.dto';
import { ECommService } from './e-comm.service';
import {  createProductDto } from './dto/createProduct.dto';
import {  FileInterceptor } from '@nestjs/platform-express';

@Controller('e-comm')
export class ECommController {
    public constructor(private EcommService : ECommService){}

    @Get("getAllProducts")
    findAll():any{
        return this.EcommService.getAllProducts()
    }
    @Post("uploadImage/:id")
    @UseInterceptors(FileInterceptor('file'))
    uploadImage( @UploadedFile() file:Express.Multer.File , @Param('id') id:string) {
      return this.EcommService.create(file,id)
    }

    @Post("createNewProduct")
    createProduct(@Body() product:createProductDto){
        return this.EcommService.create(product,"")
    }

    @Post("deleteProduct")
    deleteProduct(@Body() data:any){
        return this.EcommService.deleteProduct(data)
    }

    @Post("updateImage")
    @UseInterceptors(FileInterceptor('file'))
    updateImage(@Body() _id:string ,@UploadedFile() file:Express.Multer.File){
        return this.EcommService.updateImage(_id,file)
    }

    @Post("updateProduct")
    updateProduct(@Body() data:any){
        return this.EcommService.updateProduct(data)
    }
}
