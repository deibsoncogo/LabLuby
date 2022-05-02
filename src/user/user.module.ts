import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
