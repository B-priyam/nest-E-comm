import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { createCategoryDto } from 'src/e-comm/dto/createProduct.dto';
// import { ObjectId } from 'mongoose';

@Controller('category')
export class CategoryController {
    public constructor(private categoryService : CategoryService){}

    @Get("getAll")
    findall():any{
        return this.categoryService.getCategories()
    }

    @Post("createCategory")
    async createCategory(@Body() data:createCategoryDto){
        return this.categoryService.createCategory(data)
    }

    @Delete("deleteCategory/:id")
    async deleteCategory(@Param() params:any){
        return this.categoryService.deleteCategory(params.id)
    }

    @Post("editCategory")
    async editCategory(@Body() data:any){
        return this.categoryService.editCategory(data)
    }
}
