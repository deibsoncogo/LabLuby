import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { RuleController } from "./rule.controller";
import { RuleResolver } from "./rule.resolver";
import { RuleService } from "./rule.service";

@Module({
  imports: [DatabaseModule],
  providers: [RuleService, RuleResolver],
  controllers: [RuleController],
})
export class RuleModule {}
