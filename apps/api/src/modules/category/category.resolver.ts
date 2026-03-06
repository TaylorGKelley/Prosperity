import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/lib/graphhql/inputs/category.inputs';
import { Category } from 'src/lib/graphhql/category.schema';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  public async categories(
    @Args('monthDate') monthDate: Date,
    @Args('budgetId') budgetId: string,
  ) {
    return await this.categoryService.getAll({ budgetId, monthDate });
  }

  @Query(() => Category)
  public async category(@Args('id') id: string) {
    const category = await this.categoryService.get({ id });

    if (!category) throw new Error('Cannot find a category with that Id');

    return category;
  }

  @Mutation(() => Category)
  public async createCategory(@Args('input') input: CreateCategoryInput) {
    return await this.categoryService.create({ input });
  }

  @Mutation(() => Category)
  public async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return await this.categoryService.update({ input });
  }

  @Mutation(() => Category)
  public async deleteCategory(@Args('id') id: string) {
    return await this.categoryService.delete({ id });
  }
}
