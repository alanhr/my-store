import { Category } from '@infrastructure/models/category.model'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
