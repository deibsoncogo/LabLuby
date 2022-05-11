import { Module } from "@nestjs/common";
import { CartService } from "src/cart/cart.service";
import { DatabaseModule } from "src/database/database.module";
import { GameService } from "src/game/game.service";
import { UserService } from "src/user/user.service";
import { BetResolver } from "./bet.resolver";
import { BetService } from "./bet.service";

@Module({
  imports: [DatabaseModule],
  providers: [BetService, BetResolver, UserService, GameService, CartService],
})
export class BetModule {}
