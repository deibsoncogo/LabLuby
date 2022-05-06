import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BetModule } from "./bet/bet.module";
import { CartModule } from "./cart/cart.module";
import { DatabaseModule } from "./database/database.module";
import { GameModule } from "./game/game.module";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { RuleAdminMiddleware } from "./middleware/ruleAdmin.middleware";
import { RulePlayerMiddleware } from "./middleware/rulePlayer.middleware";
import { RuleModule } from "./rule/rule.module";
import { UserRuleModule } from "./user-rule/user-rule.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    DatabaseModule,
    UserModule,
    RuleModule,
    UserRuleModule,
    GameModule,
    CartModule,
    BetModule,
    AuthModule,
  ],
  providers: [AppService, AppResolver],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude("", "auth", { path: "user", method: RequestMethod.POST })
      .forRoutes("*");

    consumer
      .apply(RulePlayerMiddleware)
      .exclude("", "auth", { path: "user", method: RequestMethod.POST })
      .forRoutes("*");

    consumer
      .apply(RuleAdminMiddleware)
      .forRoutes(
        "rule",
        "userRule",
        "cart",
        "game",
        { path: "user", method: RequestMethod.GET },
        { path: "bet", method: RequestMethod.GET },
        { path: "*", method: RequestMethod.DELETE },
      );
  }
}
