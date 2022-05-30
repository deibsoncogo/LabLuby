import { Module } from "@nestjs/common"
import { DatabaseModule } from "src/database/database.module"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { UserResolver } from './user.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
