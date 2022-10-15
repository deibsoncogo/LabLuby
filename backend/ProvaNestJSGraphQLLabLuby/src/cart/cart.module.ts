import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CartResolver } from "./cart.resolver";
import { CartService } from "./cart.service";

@Module({
  imports: [DatabaseModule],
  providers: [CartService, CartResolver],
})
export class CartModule {}
