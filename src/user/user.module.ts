import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
