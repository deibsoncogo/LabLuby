import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameResolver } from "./game.resolver";
import { GameController } from "./game.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [GameService, GameResolver],
  controllers: [GameController],
})
export class GameModule {}
