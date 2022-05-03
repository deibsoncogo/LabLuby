import { Module } from "@nestjs/common";
import { BetService } from "./bet.service";
import { BetResolver } from "./bet.resolver";
import { BetController } from "./bet.controller";
import { DatabaseModule } from "src/database/database.module";
import { UserService } from "src/user/user.service";
import { GameService } from "src/game/game.service";
import { CartService } from "src/cart/cart.service";

@Module({
  imports: [DatabaseModule],
  providers: [BetService, BetResolver, UserService, GameService, CartService],
  controllers: [BetController],
})
export class BetModule {}
