import { Module } from '@nestjs/common'
import databaseConfig from '@config/database.config'
import { ConfigModule } from '@nestjs/config'
import { InfrastructureModule } from '@infrastructure/infrastrucuture.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: ['.env.development.local'],
    }),
    InfrastructureModule,
  ],
})
export class AppModule {}
