import { Module } from "@nestjs/common";
import { BetService } from "./bet.service";
import { BetResolver } from "./bet.resolver";
import { BetController } from "./bet.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [BetService, BetResolver],
  controllers: [BetController],
})
export class BetModule {}
