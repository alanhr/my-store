const path = require('path') // eslint-disable-line
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, process.env.NODE_ENV !== 'test' ? '.env.local' : '.env.test.local'),
})
function env(key) {
  return envConfig.parsed[key] || process.env[key]
}

const baseConfig = {
  type: 'mysql',
  database: env('DATABASE_NAME'),
  entities: [path.resolve(__dirname, 'src/infrastructure/models/*.model{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'src/infrastructure/database/migrations/**/*.ts')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  seeds: [path.resolve(__dirname, 'src/infrastructure/database/seeds/*.seed{.ts,.js}')],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
    entitiesDir: 'src/infrastructure/models',
  },
}

if (process.env.NODE_ENV !== 'test') {
  module.exports = {
    host: env('DATABASE_HOST'),
    username: env('DATABASE_USERNAME'),
    password: env('DATABASE_PASSWORD'),
    ...baseConfig,
  }
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  }
}
