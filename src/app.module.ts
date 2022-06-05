import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
  ],
  providers: [AppService, AppResolver],
  controllers: [AppController],
})
export class AppModule {}
