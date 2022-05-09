import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { BetModule } from "./bet/bet.module";
import { CartModule } from "./cart/cart.module";
import { DatabaseModule } from "./database/database.module";
import { GameModule } from "./game/game.module";
import { RuleModule } from "./rule/rule.module";
import { UserRuleModule } from "./user-rule/user-rule.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    DatabaseModule,
    UserModule,
    RuleModule,
    UserRuleModule,
    GameModule,
    CartModule,
    BetModule,
  ],
  providers: [AppService, AppResolver],
  controllers: [AppController],
})
export class AppModule {}
