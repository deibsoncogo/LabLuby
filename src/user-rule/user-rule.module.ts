import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UserRuleResolver } from "./user-rule.resolver";
import { UserRuleService } from "./user-rule.service";

@Module({
  imports: [DatabaseModule],
  providers: [UserRuleService, UserRuleResolver],
})
export class UserRuleModule {}
