import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './category.controller';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service';

@Module({
  exports: [ValidateCategoryOwnershipService],
  controllers: [CategoryController],
  providers: [CategoryService, ValidateCategoryOwnershipService],
})
export class CategoryModule {}
