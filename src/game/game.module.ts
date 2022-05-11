import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
  imports: [DatabaseModule],
  providers: [GameService, GameResolver],
})
export class GameModule {}
