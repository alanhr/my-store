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
import { ShoppingCart } from '@application/entities/shopping-cart.entity'
import { format } from 'currency-formatter'
import { ShoppingCartProductRepository } from '@infrastructure/repositores/shopping-cart-product.repository'


describe('AppController (e2e)', () => {
  let app: INestApplication
  let container: StartedTestContainer;
  let productRepository: ProductRepository
  let categoryRepository: CategoryRepository
  let shoppingCartProductRepository: ShoppingCartProductRepository

  beforeAll(async () => {
    console.log('Start to up mysql container')
    container = await new GenericContainer("mysql", '5.7')
      .withName('store-db-test')
      .withEnv('MYSQL_DATABASE', 'store-test-db')
      .withEnv('MYSQL_USER', 'store')
      .withEnv('MYSQL_PASSWORD', 'store@123')
      .withEnv('MYSQL_ROOT_PASSWORD', 'store@123')
      .withExposedPorts(3306)
      .start()

    process.env.DATABASE_PORT = container.getMappedPort(3306).toString()
    console.log('container up !')
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
    shoppingCartProductRepository = moduleFixture.get(ShoppingCartProductRepository)

    const totalCategory = await categoryRepository.count({where:categoryFixture})

    if(totalCategory === 0) {
      await categoryRepository.save(categoryFixture)
    }

    await app.init()

  }, 100000)

  afterEach(async() => {
    await productRepository.delete({})
  })

  describe(`Product`,() => {
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
      const response = await request(app.getHttpServer()).post('/graphql')
        .send({
          query: query
        })

      const expectedPrice = format(productsFixture[0].price, { locale: 'pt-BR' })

      const products: Product[] = response.body.data.products
      expect(products).toHaveLength(3);
      expect(products[0]).toHaveProperty('price', expectedPrice);
    })
  })

  describe('ShoppingCart',() => {
    afterEach(async () => {
      await shoppingCartProductRepository.delete({})
    })
    
    it('addProductInCart', async() => {
      await productRepository.save(productsFixture)

      const productId = 1

      const query = `
        mutation addProductInCart($productId: ID!, $cartId: ID) {
          addProductInCart(cartId: $cartId, productId: $productId) {
            id
            items {
              quantity
              product {
                name
                price
              }
            }
          }
        }
      `

      const expectedResult = expect.objectContaining({
        id: expect.any(String),
        items: expect.arrayContaining([
          expect.objectContaining({
            quantity:expect.any(Number),
            product: {
              name: expect.any(String),
              price: expect.any(String),
            }
          })
        ])
      })

      const response = await request(app.getHttpServer()).post('/graphql')
        .send({
          query: query,
          variables: {
            productId
          }
        })

      const cart: ShoppingCart = response.body.data.addProductInCart
      expect(cart).toEqual(expectedResult)

      const cartId = cart.id

      const response2 = await request(app.getHttpServer()).post('/graphql')
        .send({
          query: query,
          variables: {
            productId,
            cartId
          }
        })


      expect(response2.body.data.addProductInCart.items).toHaveLength(1)
      expect(response2.body.data.addProductInCart.items[0].quantity).toBeGreaterThan(1)
    })
  })
})
