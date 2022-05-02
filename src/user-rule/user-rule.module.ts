import { Module } from "@nestjs/common";
import { UserRuleService } from "./user-rule.service";
import { UserRuleResolver } from "./user-rule.resolver";
import { UserRuleController } from "./user-rule.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [UserRuleService, UserRuleResolver],
  controllers: [UserRuleController],
})
export class UserRuleModule {}
