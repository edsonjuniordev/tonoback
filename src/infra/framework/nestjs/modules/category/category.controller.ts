import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IsActiveUserId } from '@infra/framework/nestjs/decorators/is.active.user.id';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(@IsActiveUserId() userId: string, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(userId, createCategoryDto);
  }

  @Get()
  findAll(@IsActiveUserId() userId: string) {
    return this.categoryService.findAllByUserId(userId);
  }
}
