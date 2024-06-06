// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      // console.log(file)
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  deleteFile(secure_url:any){
    console.log("api hit")
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.destroy(secure_url, (error, result) => {
        if (error) return reject(error);
        resolve(result);
    },);
  })
}

async updater(imagePublicId:any, imagePath:any) {
  try {
      const result = await cloudinary.uploader.upload(imagePath, {
          public_id: imagePublicId,
      })
      return result
  } catch (error) {
      
          console.log("Cannot update image. Please try again.")
      
  }
}
}
