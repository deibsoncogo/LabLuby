import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { RuleModule } from "./rule/rule.module";
import { UserModule } from "./user/user.module";
import { UserRuleModule } from './user-rule/user-rule.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    UserModule,
    RuleModule,
    UserRuleModule,
    GameModule,
  ],
  providers: [AppService, AppResolver],
  controllers: [AppController],
})
export class AppModule {}
