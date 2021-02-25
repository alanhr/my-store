import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Category } from '../../models/category.model'

export default class CreateCategory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([{ name: 'Eletrônicos', id: 1 }])
      .execute()
  }
}
