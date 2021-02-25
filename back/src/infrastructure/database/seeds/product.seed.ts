import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Product } from '../../models/product.model'

export default class CreateProduct implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values([
        {
          category: { id: 1 },
          name: 'Samsung galaxy',
          image: 'celular-samsung-galaxy-a21s-64gb-4gb-tela-65-4-branco_1.jpg',
          quantity: 10,
          price: 1200,
        },
      ])
      .execute()
  }
}
