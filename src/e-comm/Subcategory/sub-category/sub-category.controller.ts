import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { createSubCategoryDto } from 'src/e-comm/dto/createProduct.dto';

@Controller('sub-category')
export class SubCategoryController {
  public constructor(private subcategoryService: SubCategoryService) {}

  @Get('getAllSubCategory')
  async getAllSubCategories(@Query('id') id: any) {
    return this.subcategoryService.getAllSubCategories(id);
  }

  @Post('createNewSubCategory')
  async createSubCategory(@Body() subcategory: createSubCategoryDto) {
    return this.subcategoryService.createSubCategory(subcategory);
  }

  @Post('deleteSubCategory')
  async deleteSubCategory(@Body() data: any) {
    return await this.subcategoryService.deleteSubCategory(data);
  }

  @Post('updateSubCategory')
  async updateSubCategory(@Body() data: any) {
    return await this.subcategoryService.updateSubCategory(data);
  }
}
