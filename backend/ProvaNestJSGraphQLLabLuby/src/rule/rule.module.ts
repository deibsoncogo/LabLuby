import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { RuleResolver } from "./rule.resolver";
import { RuleService } from "./rule.service";

@Module({
  imports: [DatabaseModule],
  providers: [RuleService, RuleResolver],
})
export class RuleModule {}
