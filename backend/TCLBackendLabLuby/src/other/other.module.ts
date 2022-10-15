import { Module } from '@nestjs/common'
import { OtherController } from './other.controller'
import { OtherService } from './other.service'

@Module({
  providers: [OtherService],
  controllers: [OtherController],
})
export class OtherModule {}
