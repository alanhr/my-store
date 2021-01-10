import { Module } from '@nestjs/common'
import databaseConfig from '@config/database.config'
import appConfig from '@config/app.config'
import { ConfigModule } from '@nestjs/config'
import { ApplicationModule } from '@application/application.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
      envFilePath: [process.env.NODE_ENV === 'test' ? '.env.test.local' : '.env.local'],
    }),
    ApplicationModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    })
  ],
})
export class AppModule {}
