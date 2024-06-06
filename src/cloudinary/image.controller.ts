// // import { Controller,Post,UseInterceptors } from "@nestjs/common";
// // import { FileInterceptor } from "@nestjs/platform-express";
// // import { CloudinaryServices } from "./cloudinary.service";

// // @Controller('images')
// // export class ImageController {
// //     constructor(private readonly CloudinaryService:CloudinaryServices){}

// //     @Post('upload')
// //     @UseInterceptors(FileInterceptor('image'))
// //     async uploadFile(file:Express.Multer.File){
// //         try {
// //             console.log(file)
// //             const result = await this.CloudinaryService.uploadImage(file.path);
// //             return result
// //         } catch (error) {
// //             console.log(error)
// //             throw new Error("failed to uplaod image")
// //         }
// //     }
// // }


// // app.controller.ts

import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from './cloudinary.service';
  
  @Controller('image')
  export class ImageController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
      console.log(file)
      return this.cloudinaryService.uploadFile(file);
    }
  }
  