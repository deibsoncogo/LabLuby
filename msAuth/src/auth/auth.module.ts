import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { DatabaseModule } from "../database/database.module"
import { AuthController } from "./auth.controller"
import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    DatabaseModule,
  ],
  providers: [AuthResolver, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
