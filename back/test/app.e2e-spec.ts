import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { GenericContainer, StartedTestContainer } from 'testcontainers'
import { ProductRepository } from '@infrastructure/repositores/product.repository'
import * as categoryFixture from './fixtures/category.json'
import * as productsFixture from './fixtures/products.json'
import { CategoryRepository } from '@infrastructure/repositores/category.repository'
import { Product } from '@application/entities/product.entity'
import { format } from 'currency-formatter'


describe('AppController (e2e)', () => {
  let app: INestApplication
  let container: StartedTestContainer;
  let server: request.SuperTest<request.Test>
  let productRepository: ProductRepository
  let categoryRepository: CategoryRepository

  beforeAll(async () => {
    container = await new GenericContainer("mysql", '5.7')
      .withName('store-db-test')
      .withEnv('MYSQL_DATABASE', 'store-test-db')
      .withEnv('MYSQL_USER', 'store')
      .withEnv('MYSQL_PASSWORD', 'store@123')
      .withEnv('MYSQL_ROOT_PASSWORD', 'store@123')
      .withExposedPorts(3306)
      .start()

    process.env.DATABASE_PORT = container.getMappedPort(3306).toString()
  }, 100000)

  afterAll(async () => {
    await container.stop();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()

    app = moduleFixture.createNestApplication()
    
    productRepository = moduleFixture.get(ProductRepository)
    categoryRepository = moduleFixture.get(CategoryRepository)

    const totalCategory = await categoryRepository.count({where:categoryFixture})

    if(totalCategory === 0) {
      await categoryRepository.save(categoryFixture)
    }

    await app.init()

    server = request(app.getHttpServer())

  }, 100000)

  afterEach(async() => {
    await productRepository.delete({})
  })

  it('getProducts', async () => {
    await productRepository.save(productsFixture)

    const query = `
      query getProducts {
        products {
          id
          name
          price
        }
      }
    `
    const response = await server.post('/graphql')
      .send({
        query: query
      })

    const expectedPrice = format(productsFixture[0].price, { locale:'pt-BR' })

    const products: Product[]  = response.body.data.products
    expect(products).toHaveLength(3);
    expect(products[0]).toHaveProperty('price', expectedPrice);
  })
})
