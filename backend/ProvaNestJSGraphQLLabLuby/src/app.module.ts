import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { join } from "path";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { AuthGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";
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
  providers: [AppService, AppResolver, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
